var Reflux = require('reflux');
var directionsMethods = require('../utils/googleMaps/directions');

var mapActions = Reflux.createActions([
    'mapClicked',
    'newWaypoint',
    'routeUpdated',
    'undo',
    'save',
    'load',
    'updateRouteDetails',
    'elevationHover',
    'pickHighlighted',
    'pickUnhighlighted',
    'measurementChanged',
    'userLocationChanged',
    'newLeg'
]);

mapActions.mapClicked.listen(latLng => {
    directionsMethods.snapToRoute(latLng, newLatLng => {
        mapActions.newWaypoint(newLatLng);
    });
});

module.exports = mapActions;
