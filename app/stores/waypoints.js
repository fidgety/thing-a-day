var Reflux = require('reflux');
var mapMethods = require('../utils/googleMaps/directions');
var actions = require('../actions/map');

module.exports = Reflux.createStore({
    listenables: actions,
    onMapClicked(latLng) {
        var that = this;
        mapMethods.snapToRoute(latLng, function (latLng) {
            that.store.push({
                latLng,
                key: latLng.lat() + ',' + latLng.lng()
            });
            actions.newWaypoint(latLng);
            that.trigger(that.store);
        });
    },
    store: [],
    getInitialState() {
        return this.store;
    }
});
