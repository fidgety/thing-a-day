var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var routeUtils = require('../utils/googleMaps/route');

module.exports = Reflux.createStore({
    listenables: actions,
    onRouteUpdated(latLngs) {
        var that = this;
        console.log('make sample points in elevations store', routeUtils.makeSamplePoints(latLngs))
        elevations(routeUtils.makeSamplePoints(latLngs, undefined, 1000), function (results) {
            results.forEach(result => {
                that.store.elevations.push(result.elevation);
                that.store.positions.push(result.location);
            });

            that.trigger(that.store);
        });
    },
    store: {
        elevations: [],
        positions: []
    },
    getInitialState() {
        return this.store;
    }
});
