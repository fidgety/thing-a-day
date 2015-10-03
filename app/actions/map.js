var Reflux = require('reflux');

module.exports = Reflux.createActions([
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
