var Reflux = require('reflux');
var mapMethods = require('../utils/googleMaps/directions');
var actions = require('../actions/map');

module.exports = Reflux.createStore({
    listenables: actions,
    onUndo() {
        this.store.pop();
        this.trigger(this.store);
    },
    onMapClicked(latLng) {
        var that = this;
        mapMethods.snapToRoute(latLng, function (newLatLng) {
            that.store.push({
                latLng: newLatLng,
                key: newLatLng.lat() + ',' + newLatLng.lng()
            });
            actions.newWaypoint(newLatLng);
            that.trigger(that.store);
        });
    },
    store: [],
    getInitialState() {
        return this.store;
    }
});
