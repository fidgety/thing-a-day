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
            return (<li>{elevation.elevation}</li>)
        });
        return (<ul id="elevations">{ele}</ul>);
    }
});
