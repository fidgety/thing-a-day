require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var elevationsStore = require('../../../stores/elevations');


var Map = require('../../maps/plan');
var PicksDetail = require('../../picks/picksDetail');
var Stats = require('../../stats');
var UserPrompts = require('../../userPrompts');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(elevationsStore, 'onElevationsChange')],
    onElevationsChange: function (elevations) {
        this.setState({
            elevations: elevations.elevations,
            positions: elevations.positions
        });
    },
    getInitialState: function () {
        return {
            elevations: [1,1],
            positions: []
        };
    },
    render: function () {
        return (
            <div id="plan"><PicksDetail/><UserPrompts/><Map/><Stats elevations={this.state.elevations} positions={this.state.positions}/></div>
        );
    }
});