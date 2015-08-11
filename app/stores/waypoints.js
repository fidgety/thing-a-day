var Reflux = require('reflux');
var mapMethods = require('../utils/googleMaps/directions');
var actions = require('../actions/map');

module.exports = Reflux.createStore({
    listenables: actions,
    onMapClicked: function (latLng) {
        var that = this;
        mapMethods.snapToRoute(latLng, function (latLng) {
            that.store.push({
                latLng,
                key: latLng.lat() + ',' + latLng.lng()
            });
            that.trigger(that.store);
        });
    },
    store: [],
    getInitialState: function () {
        return this.store;
    }
});
