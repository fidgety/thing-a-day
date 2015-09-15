require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var Map = require('../../maps/route');
var PicksDetail = require('../../picks/picksDetail');
var Stats = require('../../stats');
var actions = require('../../../actions/map');

var MetricOrImperial = require('../../userPrompts');

var routeOverviewStore = require('../../../stores/routeOverview');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(routeOverviewStore, 'onChange')],
    onChange: function (newRouteOverviewStore) {
        this.setState(newRouteOverviewStore);
    },
    getInitialState: function () {
        var routeOverviewStatus = routeOverviewStore.getState();

        return {
            elevations: [1, 1],
            positions: [],
            distance: routeOverviewStatus.distance,
            ascending: routeOverviewStatus.ascending,
            descending: routeOverviewStatus.descending,
            flatish: routeOverviewStatus.flatish
        };
    },
    componentDidMount() {
        actions.load(this.props.params.name);
    },
    render: function () {
        return (
            <div id="route">
                <PicksDetail/>
                <MetricOrImperial/>
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