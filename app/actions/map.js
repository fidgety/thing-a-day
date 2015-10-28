var Reflux = require('reflux');
var directionsMethods = require('../utils/googleMaps/directions');

var mapActions = Reflux.createActions([
    'mapClicked',
    'newWaypoint',
    'routeUpdated',
    'undo',
    'load',
    'updateRouteDetails',
    'elevationHover',
    'measurementChanged',
    'userLocationChanged',
    'newLeg'
]);

mapActions.mapClicked.listen((latLng, pick) => {
    directionsMethods.snapToRoute(latLng, newLatLng => {
        mapActions.newWaypoint(newLatLng, pick);
    });
});

module.exports = mapActions;
