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
        this.setState({
            distance: route.distance
        })
    },
    onElevationsChange: function (elevations) {
        this.setState({
            elevations: elevations.elevations,
            positions: elevations.positions,
            ascending: elevations.ascending,
            descending: elevations.descending,
            flatish: elevations.flatish
        });
    },
    getInitialState: function () {
        return {
            elevations: [1, 1],
            positions: [],
            distance: routeStore.getInitialState().distance,
            ascending: elevationsStore.getState().ascending,
            descending: elevationsStore.getState().descending,
            flatish: elevationsStore.getState().flatish
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