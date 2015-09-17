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
    name: ''
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
        if (_store.legs.length === 0) {
            _store.startingLatLng = undefined;
        }
        _store.legs.pop();
        _store.endLatLng = this._endOfRoute();

        if (_store.legs.length === 0) {
            _store.endLatLng = undefined;
        }
        this._calcDistance();
        this.trigger(_store);
    },
    onUpdateName(newName) {
        _store.name = newName;
        this.trigger(_store);
    },
    onSave() {
        var elevations = require('./elevations').toString();
        var route = new google.maps.Polyline();
        var legs = _store.legs.map(leg => {
            route = polyline.join(route, leg.polyline);
            return polyline.encode(leg.polyline);
        });

        console.log('save to local storage', {
            name: _store.name,
            elevations,
            legs,
            route: polyline.encode(route)
        });

        window.localStorage.setItem(_store.name, JSON.stringify({
            name: _store.name,
            elevations,
            legs,
            route: polyline.encode(route)
        }));
    },
    onElevationHover(latLng) {
        _store.elevationHover = latLng;
        this.trigger(_store);
    },
    onNewWaypoint(latLng) {
        if (this._routeStarted()) {
            mapMethods.getDirections(this._endOfRoute(), latLng, (route) => {
                var newRouteLatLngs = routeMethods.routeToLatLngs(route);
                actions.routeUpdated(newRouteLatLngs);
                this._addLeg(newRouteLatLngs);
                _store.endLatLng = this._endOfRoute();
                this._calcDistance();
                this.trigger(_store);
            })
        } else {
            _store.startingLatLng = latLng;
            this.trigger(_store);
        }

    },
    getInitialState() {
        return _store;
    },
    _routeStarted() {
        return _store.startingLatLng;
    },
    _endOfRoute() {
        if (_store.legs.length) {
            var path = _store.legs[_store.legs.length - 1].polyline.getPath();
            return path.getAt(path.getLength() - 1)
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
    _addLeg(newLatLngs) {
        _store.legs.push({
            polyline: new google.maps.Polyline({
                path: newLatLngs
            })
        });
    }
});
