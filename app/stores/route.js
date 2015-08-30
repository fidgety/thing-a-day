var Reflux = require('reflux');
var mapMethods = require('../utils/googleMaps/directions');
var routeMethods = require('../utils/googleMaps/route');
var actions = require('../actions/map');
var flattenArray = require('../utils/array/flatten');

module.exports = Reflux.createStore({
    listenables: actions,

    onUndo() {
        this.store.legs.pop();
        if (this.store.legs.length === 0) {
            this.store.startingLatLng = undefined;
        }
        this._calcDistance();
        this.trigger(this.store);
    },
    onNewWaypoint(latLng) {
        var that = this;
        if (this._routeStarted()) {
            mapMethods.getDirections(this._previousWaypoint(), latLng, function (route) {
                var newRouteLatLngs = routeMethods.routeToLatLngs(route);
                actions.routeUpdated(newRouteLatLngs);
                that._addLeg(newRouteLatLngs);
                that._calcDistance();
                that.trigger(that.store);
            })
        } else {
            this.store.startingLatLng = latLng;
        }

    },
    store: {
        legs: [],
        distance: 0
    },
    getInitialState() {
        return this.store;
    },
    _routeStarted() {
        return this.store.startingLatLng;
    },
    _previousWaypoint() {
        if (this.store.legs.length) {
            var path = this.store.legs[this.store.legs.length - 1].polyline.getPath();
            return path.getAt(path.getLength() - 1)
        }

        return this.store.startingLatLng;
    },
    _calcDistance() {
        var route = flattenArray(this.store.legs.map(polyline => polyline.polyline.getPath().getArray()));
        this.store.distance = google.maps.geometry.spherical.computeLength(route);
    },
    _addLeg(newLatLngs) {
        this.store.legs.push({
            polyline: new google.maps.Polyline({
                path: newLatLngs
            })
        });
    }
});
