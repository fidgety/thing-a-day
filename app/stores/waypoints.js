var Reflux = require('reflux');
var mapMethods = require('./directionsUtils');
var actions = require('../actions/waypointRequested');

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
