var Reflux = require('reflux');
var mapMethods = require('../utils/googleMaps/directions');
var actions = require('../actions/map');

module.exports = Reflux.createStore({
    listenables: actions,
    onMapClicked: function (latLng) {
        var that = this;
        mapMethods.snapToRoute(latLng, function (latLng) {
            that.waypoints.push(latLng);
            that.trigger(that.waypoints);
        });
    },
    waypoints: [],
    getInitialState: function () {
        return waypointsStore;
    }
});
