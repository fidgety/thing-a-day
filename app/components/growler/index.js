require('./style.scss');

var React = require('react');
var Reflux = require('reflux');
var waypointsStore = require('../../stores/waypoints');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(waypointsStore, 'onWaypointsChange')
    ],
    getInitialState() {
        return {
            routeStarted: false,
            amountOfWaypoints: 0,
            showGrowler: true
        };
    },
    onWaypointsChange(waypoints) {
        this.setState({
            routeStarted: waypoints.length !== 0,
            amountOfWaypoints: waypoints.length,
            showGrowler: waypoints.length > 1 ? false : this.state.showGrowler
        });
    },
    render() {
        var growlerCSS = this.state.showGrowler ? '' : 'hidden';
        var hideGrowler = function () {
            this.setState({
                showGrowler: false
            });
        }.bind(this);

        var text = 'Click anywhere on the map to start a route';

        if (this.state.amountOfWaypoints === 1) {
            text = 'Now click somewhere else and let us find a route there';
        }

        return (
            <div id="growler" className={growlerCSS} onClick={hideGrowler}>
            {text}
                <div className="dismiss">ok, got it</div>
            </div>
        );
    }
});
