var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var routeUtils = require('../utils/googleMaps/route');
var flattenArray = require('../utils/array/flatten');

var optionsStore = require('./options');

var _elevationMetrics = {
    unit: optionsStore.getInitialState().elevationUnit,
    converter: optionsStore.getInitialState().elevationConverter
};

var _store = {
    elevations: [],
    positions: [],
    legs: [],
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
        this._updateStoreWithNewValues();
    },
    onUndo() {
        _store.legs.pop();
        this._updateStoreWithNewValues();
    },
    onRouteUpdated(latLngs) {
        elevations.getElevations(routeUtils.makeSamplePoints(latLngs, undefined, 1000), results => {
            this._addLeg(results);
            this._updateStoreWithNewValues();
        });
    },
    toString() {
        return _store.elevations.map((elevation, i) => {
            return {
                elevation: elevation,
                location: {
                    lat: _store.positions[i].lat(),
                    lng: _store.positions[i].lng()
                }
            }
        });
    },
    getState() {
        return _store;
    },
    _updateStoreWithNewValues() {
        this._updateElevations();
        this._updateAscDesc();
        this.trigger(_store);
    },
    _addLeg(newElevations) {
        _store.legs.push(newElevations);
    },
    _updateElevations() {
        var allElevations = flattenArray(_store.legs);

        _store.elevations = [];
        _store.positions = [];

        allElevations.forEach(elevation => {
            _store.elevations.push(elevation.elevation);
            _store.positions.push(elevation.location);
        });
    },
    _updateAscDesc() {
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
    }
});
