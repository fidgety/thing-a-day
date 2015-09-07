require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');

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
    onPicksChange: function (waypoints) {
        this.setState({
            routeStarted: waypoints.length !== 0
        });
    },
    render: function () {
        var activeClass = this.state.routeStarted ? 'undo-active' : '';

        return (
            <div id="undo" className={activeClass}></div>
        );
    }
});