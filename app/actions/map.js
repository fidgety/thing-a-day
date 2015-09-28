var Reflux = require('reflux');

module.exports = Reflux.createActions([
    'mapClicked',
    'newWaypoint',
    'routeUpdated',
    'undo',
    'save',
    'load',
    'updateName',
    'elevationHover',
    'pickHighlighted',
    'pickUnhighlighted',
    'measurementChanged',
    'userLocationChanged',
    'newLeg'
]);
