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

module.exports = Reflux.createStore({
    init() {
        this.listenTo(optionsStore, this.optionsUpdated);
    },
    listenables: actions,
    optionsUpdated(newOptionsStoreValues) {
        _elevationMetrics = {
            unit: newOptionsStoreValues.elevationUnit,
            converter: newOptionsStoreValues.elevationConverter
        };
        this._updateStoreWithNewValues();
        this.trigger(this.store);
    },
    onUndo() {
        this.store.legs.pop();
        this._updateStoreWithNewValues();
    },
    onRouteUpdated(latLngs) {
        var that = this;

        elevations.getElevations(routeUtils.makeSamplePoints(latLngs, undefined, 1000), function (results) {
            that._addLeg(results);
            that._updateStoreWithNewValues();
        });
    },
    store: {
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
    },
    toString() {
        return this.store.elevations.map((elevation, i) => {
            return {
                elevation: elevation,
                location: {
                    lat: this.store.positions[i].lat(),
                    lng: this.store.positions[i].lng()
                }
            }
        });
    },
    getInitialState() {
        return this.store;
    },
    _updateStoreWithNewValues() {
        this._updateElevations();
        this._updateAscDesc();
        this.trigger(this.store);
    },
    _addLeg(newElevations) {
        this.store.legs.push(newElevations);
    },
    _updateElevations() {
        var store = this.store;
        var allElevations = flattenArray(store.legs);

        store.elevations = [];
        store.positions = [];

        allElevations.forEach(elevation => {
            store.elevations.push(elevation.elevation);
            store.positions.push(elevation.location);
        });
    },
    _updateAscDesc() {
        var stats = elevations.calculateUpsAndDowns(this.store.elevations);
        this.store.ascending = {
            value: parseInt(stats.ascending / _elevationMetrics.converter, 10),
            unit: _elevationMetrics.unit
        };
        this.store.descending = {
            value: parseInt(stats.descending / _elevationMetrics.converter, 10),
            unit: _elevationMetrics.unit
        };
        this.store.flatish = {
            value: parseInt(stats.flatish / _elevationMetrics.converter, 10),
            unit: _elevationMetrics.unit
        };
    }
});
