require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var routeStore = require('../../stores/route');
var elevationsStore = require('../../stores/elevations');

var Ticker = require('../ticker');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(routeStore, 'onRouteChange'),
        Reflux.listenTo(elevationsStore, 'onElevationsChange')
    ],
    getInitialState: function () {
        return {
            distance: 0,
            ascending: 0,
            descending: 0
        };
    },
    onRouteChange(route) {
        var distanceInKm = (route.distance / 1000).toFixed(2);
        this.setState({
            distance: distanceInKm
        })
    },
    onElevationsChange(elevations) {
        this.setState({
            ascending: elevations.ascending,
            descending: elevations.descending
        });
    },
    render: function () {
        return <div>
            <Ticker name="distance" value={this.state.distance} animate={true}/>
            <Ticker name="asc" value={this.state.ascending} animate={true}/>
            <Ticker name="desc" value={this.state.descending} animate={true}/>
        </div>
    }
});