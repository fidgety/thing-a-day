var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var routeUtils = require('../utils/googleMaps/route');

module.exports = Reflux.createStore({
    listenables: actions,
    _updateElevations(newElevations) {
        var store = this.store;
        newElevations.forEach(newElevation => {
            store.elevations.push(newElevation.elevation);
            store.positions.push(newElevation.location);
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
    onRouteUpdated(latLngs) {
        var store = this.store;
        var that = this;

        elevations(routeUtils.makeSamplePoints(latLngs, undefined, 1000), function (results) {
            that._updateElevations(results);
            that._updateAscDesc();
            that.trigger(store);
        });
    },
    store: {
        elevations: [],
        positions: [],
        ascending: 0,
        descending: 0
    },
    getInitialState() {
        return this.store;
    }
});
