var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var routeUtils = require('../utils/googleMaps/route');
var flattenArray = require('../utils/array/flatten');

module.exports = Reflux.createStore({
    listenables: actions,
    _addLegElevations(newElevations) {
        this.store.legs.push(newElevations);
        this._updateElevations()
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
        var store = this.store;
        store.ascending = 0;
        store.descending = 0;

        store.elevations.reduce((prevValue, currentValue) => {
            var difference = prevValue - currentValue;

            difference > 0 ? store.descending += Math.abs(difference) : store.ascending += Math.abs(difference);
            return currentValue;
        });
    },
    onUndo() {
        this.store.legs.pop();
        this._updateElevations();
        this._updateAscDesc();
        this.trigger(this.store);
    },
    onRouteUpdated(latLngs) {
        var store = this.store;
        var that = this;

        elevations(routeUtils.makeSamplePoints(latLngs, undefined, 1000), function (results) {
            that._addLegElevations(results);
            that._updateAscDesc();
            that.trigger(store);
        });
    },
    store: {
        elevations: [],
        positions: [],
        legs: [],
        ascending: 0,
        descending: 0
    },
    getInitialState() {
        return this.store;
    }
});
