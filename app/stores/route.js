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

var _store = {
    legs: [],
    distance: {
        value: 0,
        unit: _distanceMetrics.unit
    },
    startingLatLng: undefined,
    endLatLng: undefined,
    elevationHover: undefined,
    name: '',
    description: ''
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
        this.trigger(_store);
    },
    onUndo() {
        _store.legs.pop();
        this._setStartAndEnd();

        this._calcDistance();
        this.trigger(_store);
    },
    onUpdateRouteDetails(newDetails) {
        _store.name = newDetails.name;
        _store.description = newDetails.description;
        this.trigger(_store);
    },
    onElevationHover(latLng) {
        _store.elevationHover = latLng;
        this.trigger(_store);
    },
    onNewLeg(latLngs, pick) {
        actions.routeUpdated(latLngs);
        this._addLeg(latLngs, pick);
        _store.endLatLng = this._endOfRoute();
        this._calcDistance();
        this.trigger(_store);
    },
    onNewWaypoint(latLng, pick) {
        if (this._routeStarted()) {
            mapMethods.getDirections(this._endOfRoute(), latLng, (route) => {
                var newRouteLatLngs = routeMethods.routeToLatLngs(route);
                actions.newLeg(newRouteLatLngs, pick);
            })
        } else {
            this._addLeg([latLng], pick);
            this.trigger(_store);
        }

    },
    getState() {
        return _store;
    },
    _routeStarted() {
        return this._startOfRoute() !== undefined;
    },
    _startOfRoute() {
        if (_store.legs.length) {
            var path = _store.legs[0].polyline.getPath();
            return path.getAt(0);
        }

        return undefined;
    },
    _endOfRoute() {
        if (_store.legs.length) {
            var path = _store.legs[_store.legs.length - 1].polyline.getPath();
            return path.getAt(path.getLength() - 1);
        }

        return _store.startingLatLng;
    },
    _calcDistance() {
        var route = flattenArray(_store.legs.map(legPolyline => legPolyline.polyline.getPath().getArray()));

        _store.distance = {
            value: (polyline.distance(route) / _distanceMetrics.converter).toFixed(1) || 0,
            unit: _distanceMetrics.unit
        };
    },
    _setStartAndEnd() {
        _store.startingLatLng = this._startOfRoute();
        _store.endLatLng = this._endOfRoute();
    },
    _addLeg(newLatLngs, pick) {
        _store.legs.push({
            polyline: new google.maps.Polyline({
                path: newLatLngs
            }),
            pick
        });

        this._setStartAndEnd();
    }
});
