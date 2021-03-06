var Reflux = require('reflux');
var actions = require('./map');
var polylineUtils = require('../utils/googleMaps/polyline');
var directionsUtils = require('../utils/googleMaps/directions');
var routeUtils = require('../utils/googleMaps/route');
var latLngUtils = require('../utils/googleMaps/latLng');
var routeStore = require('../stores/route');

var picksActions = Reflux.createActions([{
    pickSelected: true
},
    'pickHighlighted',
    'pickUnhighlighted'
]);

function addRoute(pick) {
    console.log(pick)
    var route = pick.route;
    var latestUserWaypoint = routeStore.getState().endLatLng;
    var latLngs = polylineUtils.decode(route);

    var start = latLngs[0];
    var end = latLngs[latLngs.length - 1];

    if (!latestUserWaypoint) {
        actions.newLeg(latLngs);
    } else {
        var nearest = latLngUtils.nearest(latestUserWaypoint, start, end);
        if (nearest !== start) {
            latLngs.reverse();
        }
        directionsUtils.getDirections(latestUserWaypoint, nearest, (newRoute) => {
            var newRouteLatLngs = routeUtils.routeToLatLngs(newRoute);
            actions.newLeg(newRouteLatLngs.concat(latLngs), pick);
        });
    }
}

picksActions.pickSelected.listen((pick) => {
    if (['climb', 'rouleur'].indexOf(pick.type) !== -1) {
        addRoute(pick);
    } else {
        actions.mapClicked(pick.latLng, pick);
    }
    picksActions.pickUnhighlighted(pick.name);
});

module.exports = picksActions;