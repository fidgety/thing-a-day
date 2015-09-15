var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var routeUtils = require('../utils/googleMaps/route');
var flattenArray = require('../utils/array/flatten');

var optionsStore = require('./options');

var _elevationMetrics = {
    unit: optionsStore.getState().elevationUnit,
    converter: optionsStore.getState().elevationConverter
};

function makeMetric(value) {
    return {
        value: parseInt(value / _elevationMetrics.converter, 10),
        unit: _elevationMetrics.unit
    }
}

var _store = {
    elevations: [],
    positions: [],
    legs: [],
    ascending: makeMetric(0),
    descending: makeMetric(0),
    flatish: makeMetric(0)
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

        _store.ascending = makeMetric(stats.ascending);
        _store.descending = makeMetric(stats.descending);
        _store.flatish = makeMetric(stats.flatish);
    }
});
