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
            routeStarted: false
        };
    },
    onWaypointsChange: function (waypoints) {
        this.setState({
            routeStarted: waypoints.length !== 0
        });
    },
    render: function () {
        var text = this.state.routeStarted ? 'click save so you don\'t lose your progress' : 'click anywhere to start a route';

        return (
            <div id="help">{text}</div>
        );
    }
});