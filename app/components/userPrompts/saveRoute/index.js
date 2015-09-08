require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');

var waypointsStore = require('../../../stores/waypoints');
var routeStore = require('../../../stores/route');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(waypointsStore, 'onWaypointsChange'),
        Reflux.listenTo(routeStore, 'onRouteChange')
    ],
    getInitialState: function () {
        return {
            routeStarted: false,
            name: name
        };
    },
    onWaypointsChange: function (waypoints) {
        this.setState({
            routeStarted: waypoints.length !== 0
        });
    },
    onRouteChange: function (route) {
        this.setState({
            name: route.name
        });
    },
    render: function () {
        var activeClass = this.state.routeStarted ? 'save-active' : '';
        var that = this;
        var showNameOrSave = function () {
            if (that.state.name !== '') {
                actions.save();
            } else {
                var name = window.prompt('choose a name for the route');
                if (name) {
                    actions.updateName(name);
                    actions.save();
                }
            }
        };

        return (
            <div id="save" className={activeClass} onClick={showNameOrSave}>save</div>
        );
    }
});