var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');

module.exports = Reflux.createStore({
    listenables: actions,
    onNewWaypoint(latLng) {
        var that = this;
        elevations([latLng], function (results) {
            that.store.elevations.push(results[0].elevation);
            that.store.positions.push(results[0].location);
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
