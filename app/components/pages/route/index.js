require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var Map = require('../../maps/route');
var PicksDetail = require('../../picks/picksDetail');
var Stats = require('../../stats');
var actions = require('../../../actions/map');

var MetricOrImperial = require('../../userPrompts');

var routeOverview = require('../../../stores/routeOverview');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(routeOverview, 'onChange')],
    onChange: function (routeOverviewStore) {
        this.setState(routeOverviewStore);
    },
    getInitialState: function () {
        return {
            elevations: [1, 1],
            positions: [],
            distance: routeOverview.getInitialState().distance,
            ascending: routeOverview.getInitialState().ascending,
            descending: routeOverview.getInitialState().descending,
            flatish: routeOverview.getInitialState().flatish
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