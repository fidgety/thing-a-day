var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var polyline = require('../utils/googleMaps/polyline');

var optionsStore = require('./options');

var _elevationMetrics = {
    unit: optionsStore.getInitialState().elevationUnit,
    converter: optionsStore.getInitialState().elevationConverter
};

var _distanceMetrics = {
    unit: optionsStore.getInitialState().distanceUnit,
    converter: optionsStore.getInitialState().distanceConverter
};

var _store = {
    route: undefined,
        distance: {
        value: 0,
            unit: _distanceMetrics.unit
    },
    startingLatLng: undefined,
        endLatLng: undefined,
        elevationHover: undefined,
        elevations: [],
        locations: [],
        name: '',
        ascending: {
        value: 0,
            unit: _elevationMetrics.unit
    },
    descending: {
        value: 0,
            unit: _elevationMetrics.unit
    },
    flatish: {
        value: 0,
            unit: _elevationMetrics.unit
    }
};

module.exports = Reflux.createStore({
    listenables: actions,
    init() {
        this.listenTo(optionsStore, this.optionsUpdated);
    },
    optionsUpdated(newOptionsStoreValues) {
        _elevationMetrics = {
            unit: newOptionsStoreValues.elevationUnit,
            converter: newOptionsStoreValues.elevationConverter
        };
        _distanceMetrics = {
            unit: newOptionsStoreValues.distanceUnit,
            converter: newOptionsStoreValues.distanceConverter
        };
        this._updateDistance();
        this._updateElevationMerics();
        this.trigger(_store);
    },
    onLoad(routeName) {
        var route = JSON.parse(window.localStorage.getItem(routeName));

        _store.route = new google.maps.Polyline({
            path: polyline.decode(route.route)
        });

        this._updateDistance();

        _store.name = routeName;
        this._loadElevations(route.elevations);

        this.trigger(_store);
    },
    _updateDistance() {
        _store.distance = {
            value: (polyline.distance(_store.route.getPath()) / _distanceMetrics.converter).toFixed(1) || 0,
            unit: _distanceMetrics.unit
        };
    },
    _updateElevationMerics() {
        var stats = elevations.calculateUpsAndDowns(_store.elevations);
        _store.ascending = {
            value: parseInt(stats.ascending / _elevationMetrics.converter, 10),
            unit: _elevationMetrics.unit
        };
        _store.descending = {
            value: parseInt(stats.descending / _elevationMetrics.converter, 10),
            unit: _elevationMetrics.unit
        };
        _store.flatish = {
            value: parseInt(stats.flatish / _elevationMetrics.converter, 10),
            unit: _elevationMetrics.unit
        };
    },
    _loadElevations(loadedElevations) {
        loadedElevations.forEach(item => {
            _store.elevations.push(item.elevation);
            _store.locations.push(new google.maps.LatLng(item.location.lat, item.location.lng));
        });

        this._updateElevationMerics();
    },
    getState() {
        return _store;
    }
});