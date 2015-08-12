require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var elevationsStore = require('../../stores/elevations');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(elevationsStore, 'onElevationsChange')],
    getInitialState: function () {
        return {
            elevations: []
        };
    },
    onElevationsChange: function (elevations) {
        this.setState({
            elevations
        });
    },
    render: function () {
        var ele = this.state.elevations.map(function (elevation) {
            return (<li key={elevation.elevation}>{Math.floor(elevation.elevation)}m</li>)
        });
        return (<div id="elevations"><h2>Elevations</h2><ul>{ele}</ul></div>);
    }
});
