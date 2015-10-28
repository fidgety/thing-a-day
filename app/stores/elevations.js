var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var routeUtils = require('../utils/googleMaps/route');
var flattenArray = require('../utils/array/flatten');

var optionsStore = require('./options');
var sampleRate = optionsStore.getState().sampleRate;

var makeMetric = optionsStore.createUnitAndValue.forElevation;

var _store = {
    elevations: [],
    positions: [],
    legs: [],
    ascending: makeMetric(0),
    descending: makeMetric(0),
    flatish: makeMetric(0),
    uphill: makeMetric(0),
    downhill: makeMetric(0)
};

module.exports = Reflux.createStore({
    listenables: actions,
    init() {
        this.listenTo(optionsStore, this.optionsUpdated);
    },
    optionsUpdated() {
        this._updateStoreWithNewValues();
    },
    onUndo() {
        _store.legs.pop();
        this._updateStoreWithNewValues();
    },
    onRouteUpdated(latLngs) {
        elevations.getElevations(routeUtils.makeSamplePoints(latLngs, undefined, sampleRate), results => {
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
        var stats = elevations.calculateUpsAndDowns(_store.elevations, sampleRate);

        _store.ascending = makeMetric(stats.ascending);
        _store.descending = makeMetric(stats.descending);
        _store.flatish = makeMetric(stats.flatish);
        _store.uphill = makeMetric(stats.uphill);
        _store.downhill = makeMetric(stats.downhill);
    }
});
