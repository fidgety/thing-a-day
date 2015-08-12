var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');

module.exports = Reflux.createStore({
    listenables: actions,
    onNewWaypoint(latLng) {
        var that = this;
        elevations([latLng], function (results) {
            that.store.push(results[0]);
            that.trigger(that.store);
        });
    },
    store: [],
    getInitialState() {
        return this.store;
    }
});
