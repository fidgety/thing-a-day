var Reflux = require('reflux');
var mapMethods = require('../utils/googleMaps/directions');
var routeMethods = require('../utils/googleMaps/route');
var actions = require('../actions/map');
var flattenArray = require('../utils/array/flatten');
var polyline = require('../utils/googleMaps/polyline');

var optionsStore = require('./options');

var _distanceMetrics = {
    unit: optionsStore.getState().distanceUnit,
    converter: optionsStore.getState().distanceConverter
};

module.exports = Reflux.createStore({
    listenables: actions,
    init() {
        this.listenTo(optionsStore, this.optionsUpdated);
    },
    optionsUpdated(newOptionsStoreValues) {
        _distanceMetrics = {
            unit: newOptionsStoreValues.distanceUnit,
            converter: newOptionsStoreValues.distanceConverter
        };
        this._calcDistance();
        this.trigger(this.store);
    },
    onUndo() {
        if (this.store.legs.length === 0) {
            this.store.startingLatLng = undefined;
        }
        this.store.legs.pop();
        this.store.endLatLng = this._endOfRoute();

        if (this.store.legs.length === 0) {
            this.store.endLatLng = undefined;
        }
        this._calcDistance();
        this.trigger(this.store);
    },
    onUpdateName(newName) {
        this.store.name = newName;
        this.trigger(this.store);
    },
    onSave() {
        var elevations = require('./elevations').toString();
        var route = new google.maps.Polyline();
        var legs = this.store.legs.map(leg => {
            route = polyline.join(route, leg.polyline);
            return polyline.encode(leg.polyline);
        });

        console.log('save to local storage', {
            name: this.store.name,
            elevations,
            legs,
            route: polyline.encode(route)
        });

        window.localStorage.setItem(this.store.name, JSON.stringify({
            name: this.store.name,
            elevations,
            legs,
            route: polyline.encode(route)
        }));
    },
    onElevationHover(latLng) {
        this.store.elevationHover = latLng;
        this.trigger(this.store);
    },
    onNewWaypoint(latLng) {
        var that = this;
        if (this._routeStarted()) {
            mapMethods.getDirections(this._endOfRoute(), latLng, function (route) {
                var newRouteLatLngs = routeMethods.routeToLatLngs(route);
                actions.routeUpdated(newRouteLatLngs);
                that._addLeg(newRouteLatLngs);
                that.store.endLatLng = that._endOfRoute();
                that._calcDistance();
                that.trigger(that.store);
            })
        } else {
            this.store.startingLatLng = latLng;
            that.trigger(that.store);
        }

    },
    store: {
        legs: [],
        distance: {
            value: 0,
            unit: _distanceMetrics.unit
        },
        startingLatLng: undefined,
        endLatLng: undefined,
        elevationHover: undefined,
        name: ''
    },
    getInitialState() {
        return this.store;
    },
    _routeStarted() {
        return this.store.startingLatLng;
    },
    _endOfRoute() {
        if (this.store.legs.length) {
            var path = this.store.legs[this.store.legs.length - 1].polyline.getPath();
            return path.getAt(path.getLength() - 1)
        }

        return this.store.startingLatLng;
    },
    _calcDistance() {
        var route = flattenArray(this.store.legs.map(legPolyline => legPolyline.polyline.getPath().getArray()));

        this.store.distance = {
            value: (polyline.distance(route) / _distanceMetrics.converter).toFixed(1) || 0,
            unit: _distanceMetrics.unit
        };
    },
    _addLeg(newLatLngs) {
        this.store.legs.push({
            polyline: new google.maps.Polyline({
                path: newLatLngs
            })
        });
    }
});
