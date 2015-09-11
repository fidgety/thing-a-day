require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var elevationsStore = require('../../../stores/elevations');
var routeStore = require('../../../stores/route');


var Map = require('../../maps/plan');
var PicksDetail = require('../../picks/picksDetail');
var Stats = require('../../stats');
var UserPrompts = require('../../userPrompts');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(routeStore, 'onRouteChange'),
        Reflux.listenTo(elevationsStore, 'onElevationsChange')
    ],
    onRouteChange(route) {
        var distanceInKm = (route.distance / 1000).toFixed(1);
        this.setState({
            distance: distanceInKm
        })
    },
    onElevationsChange: function (elevations) {
        this.setState({
            elevations: elevations.elevations,
            positions: elevations.positions,
            ascending: parseInt(elevations.ascending, 10),
            descending: parseInt(elevations.descending, 10),
            flatish: parseInt(elevations.flatish, 10)
        });
    },
    getInitialState: function () {
        return {
            elevations: [1, 1],
            positions: [],
            distance: 0,
            ascending: 0,
            descending: 0,
            flatish: 0
        };
    },
    render: function () {
        return (
            <div id="plan">
                <PicksDetail/>
                <UserPrompts/>
                <Map/>
                <Stats
                    elevations={this.state.elevations}
                    positions={this.state.positions}
                    distance={this.state.distance}
                    ascending={this.state.ascending}
                    descending={this.state.descending}
                    flatish={this.state.flatish}
                />
            </div>
        );
    }
});