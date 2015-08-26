var Reflux = require('reflux');
var mapMethods = require('../utils/googleMaps/directions');
var routeMethods = require('../utils/googleMaps/route');
var actions = require('../actions/map');

module.exports = Reflux.createStore({
    listenables: actions,
    _routeStarted() {
        return this.store.path.getPath().length > 0;
    },
    _previousWaypoint() {
        var path = this.store.path.getPath();
        return path.getAt(path.getLength()-1)
    },
    _updatePath(newLatLngs) {
        var path = this.store.path.getPath();
        newLatLngs.forEach(latLng => path.push(latLng));
    },
    _addLeg(newLatLngs) {
        var polyline = new google.maps.Polyline({
            path: newLatLngs
        });
        this.store.legs.push({
            polyline
        });
    },
    onUndo() {
        this.store.legs.pop();
        this.trigger(this.store);
    },
    onNewWaypoint(latLng) {
        var that = this;
        if (this._routeStarted()) {
            mapMethods.getDirections(this._previousWaypoint(), latLng, function (route) {
                var newRouteLatLngs = routeMethods.routeToLatLngs(route);
                that._updatePath(newRouteLatLngs);
                that._addLeg(newRouteLatLngs);
                that.store.distance = google.maps.geometry.spherical.computeLength(that.store.path.getPath().getArray());
                actions.routeUpdated(newRouteLatLngs);
                that.trigger(that.store);
            })
        } else {
            this.store.path.getPath().push(latLng);
        }

    },
    store: {
        path: new google.maps.Polyline({
            path: []
        }),
        legs: [],
        distance: 0
    },
    getInitialState() {
        return this.store;
    }
});
