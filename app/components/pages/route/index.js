require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var Map = require('../../maps/route');
var PicksDetail = require('../../picks/picksDetail');
var Stats = require('../../stats');
var actions = require('../../../actions/map');

var routeOverview = require('../../../stores/routeOverview');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(routeOverview, 'onChange')],
    onChange: function (routeOverviewStore) {
        routeOverviewStore.distance = (routeOverviewStore.distance / 1000).toFixed(1);
        this.setState(routeOverviewStore);
    },
    getInitialState: function () {
        return {
            elevations: [1, 1],
            positions: [],
            ascending: 0,
            descending: 0,
            flatish: 0,
            distance: 0
        };
    },
    componentDidMount() {
        actions.load(this.props.params.name);
    },
    render: function () {
        return (
            <div id="route">
                <PicksDetail/>
                <Map/>
                <Stats
                    elevations={this.state.elevations}
                    positions={this.state.positions}
                    distance={this.state.distance}
                    ascending={this.state.ascending}
                    descending={this.state.descending}
                    flatish={this.state.flatish}
                />
                />
            </div>
        );
    }
});