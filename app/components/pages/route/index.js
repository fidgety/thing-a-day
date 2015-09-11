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
        this.setState({
            elevations: routeOverviewStore.elevations,
            positions: routeOverviewStore.positions
        });
    },
    getInitialState: function () {
        return {
            elevations: [1, 1],
            positions: []
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
                <Stats elevations={this.state.elevations} positions={this.state.positions}/>
            </div>
        );
    }
});