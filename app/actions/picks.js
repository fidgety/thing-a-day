var Reflux = require('reflux');
var actions = require('./map');
var polylineUtils = require('../utils/googleMaps/polyline');
var directionsUtils = require('../utils/googleMaps/directions');
var routeUtils = require('../utils/googleMaps/route');
var latLngUtils = require('../utils/googleMaps/latLng');
var waypointsStore = require('../stores/waypoints');

var picksActions = Reflux.createActions({
    routeSelected: true
});

picksActions.routeSelected.listen((route) => {
    var latestUserWaypoint = waypointsStore.getLatest();
    var latLngs = polylineUtils.decode(route);

    var start = latLngs[0];
    var end = latLngs[latLngs.length - 1];

    if (!latestUserWaypoint) {
        actions.newLeg(latLngs);
    } else {
        var nearest = latLngUtils.nearest(latestUserWaypoint.latLng, start, end);
        if (nearest !== start) {
            latLngs.reverse();
        }
        directionsUtils.getDirections(latestUserWaypoint.latLng, nearest, (newRoute) => {
            var newRouteLatLngs = routeUtils.routeToLatLngs(newRoute);
            actions.newLeg(newRouteLatLngs.concat(latLngs));
        });
    }
});

module.exports = picksActions;