
var Reflux = require('reflux');
var actions = require('../actions/map');

var watchID;
var _store = undefined;

var store = Reflux.createStore({
    listenables: actions,
    onUserLocationChanged(newLocation) {
        console.log(newLocation.toString());
        _store = newLocation;
        this.trigger(_store);
    },
    getInitialState() {
        return _store;
    }
});


function startGeoLocation() {
    if ("geolocation" in navigator) {
        watchID = navigator.geolocation.watchPosition(function(position) {
            var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            actions.userLocationChanged(location)
        });
    }
}

module.exports = store;

startGeoLocation();
