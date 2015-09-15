require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var waypointsStore = require('../../../stores/waypoints');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(waypointsStore, 'onWaypointsChange')
    ],
    getInitialState: function () {
        return {
            routeStarted: false,
            amountOfWaypoints: 0
        };
    },
    onWaypointsChange: function (waypoints) {
        this.setState({
            routeStarted: waypoints.length !== 0,
            amountOfWaypoints: waypoints.length
        });
    },
    render: function () {
        var text = 'click anywhere to start a route';

        if (this.state.amountOfWaypoints === 1) {
            text = 'now click somewhere else and let us find a route there';
        }

        if (this.state.amountOfWaypoints > 1) {
            text = 'click save so you don\'t lose your progress';
        }

        return (
            <div id="help">{text}</div>
        );
    }
});