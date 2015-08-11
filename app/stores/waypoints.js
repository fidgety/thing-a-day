var Reflux = require('reflux');
var mapMethods = require('./directionsUtils');

module.exports = Reflux.createStore({
    listenables: require('../actions/waypointRequested'),
    onMapClicked: function (latLng) {
        var that = this;
        mapMethods.snapToRoute(latLng, function (latLng) {
            that.waypoints.push(latLng);
            that.trigger(that.waypoints);
        });
    },
    waypoints: [],
    getInitialState: function () {
        return [];
    }
});
