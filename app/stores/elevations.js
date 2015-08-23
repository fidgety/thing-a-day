var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var routeUtils = require('../utils/googleMaps/route');

module.exports = Reflux.createStore({
    listenables: actions,
    onRouteUpdated(latLngs) {
        var store = this.store;
        var that = this;
        //console.log('make sample points in elevations store', routeUtils.makeSamplePoints(latLngs), store)
        elevations(routeUtils.makeSamplePoints(latLngs, undefined, 1000), function (results) {
            results.forEach(result => {
                store.elevations.push(result.elevation);
                store.positions.push(result.location);
            });

            store.ascending = 0;
            store.descending = 0;

            store.elevations.reduce((prevValue, currentValue) => {
                var difference = prevValue - currentValue;

                difference > 0 ? store.descending += Math.abs(difference) : store.ascending += Math.abs(difference);
                return currentValue;
            });
            console.log(store)
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
