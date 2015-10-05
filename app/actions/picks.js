var Reflux = require('reflux');
var actions = require('./map');
var polylineUtils = require('../utils/googleMaps/polyline');
var directionsUtils = require('../utils/googleMaps/directions');
var routeUtils = require('../utils/googleMaps/route');
var latLngUtils = require('../utils/googleMaps/latLng');
var routeStore = require('../stores/route');

var picksActions = Reflux.createActions({
    pickSelected: true
});

function addRoute(route) {
    var latestUserWaypoint = routeStore.getState().endLatLng;
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
}

picksActions.pickSelected.listen((pick) => {
    if (pick.type === 'climb') {
        addRoute(pick.route);
    } else {
        actions.mapClicked(pick.latLng);
    }
    actions.pickUnhighlighted(pick.name);
});

module.exports = picksActions;