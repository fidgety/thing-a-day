require('./style.scss');

var React = require('react');
var Map = require('../../maps/plan');
var PicksDetail = require('../../picks/picksDetail');
var Reflux = require('reflux');
var optionsStore = require('../../../stores/options');
var Header = require('../../header');
var Growler = require('../../growler');
var SaveRoute = require('../../userPrompts/saveRoute');
var Undo = require('../../userPrompts/undo');

var elevationsStore = require('../../../stores/elevations');
var routeStore = require('../../../stores/route');
var Stats = require('../../stats');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(optionsStore, 'onOptionsChange'),
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
            showGrowler: true,
            metric: true,
            elevations: [1, 1],
            positions: [],
            distance: routeStore.getState().distance,
            ascending: elevationsStore.getState().ascending,
            descending: elevationsStore.getState().descending,
            flatish: elevationsStore.getState().flatish
        };
    },
    onOptionsChange(newOptions) {
        this.setState({
            metric: newOptions.metric
        })
    },
    render: function () {
        return (
            <div id="splash">
                <Header/>
                <Growler/>
                <SaveRoute/>
                <Undo/>
                <PicksDetail/>
                <div className="map-holder">
                    <Map/>
                </div>
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
