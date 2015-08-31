require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../actions/map');
var routeStore = require('../../stores/route');

var Marker = require('../marker');
var Legs = require('../legs');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(routeStore, 'onRouteChange')
    ],
    getInitialState: function () {
        return {
            start: undefined,
            end: undefined,
            elevationHover: undefined
        };
    },
    shouldComponentUpdate() {
        return true;
    },
    onRouteChange(route) {
        this.setState({
            start: route.startingLatLng,
            end: route.endLatLng,
            elevationHover: route.elevationHover
        });
    },
    componentDidMount: function () {
    },
    render: function () {
        return (
            <div>
                <Marker key={'s' + this.state.start} latLng={this.state.start} map={this.props.map} classNames="start-marker icon-pin"/>
                <Marker key={'e' + this.state.end} latLng={this.state.end} map={this.props.map} classNames="end-marker icon-pin"/>
                <Marker key={'eh' + this.state.elevationHover} latLng={this.state.elevationHover} map={this.props.map} classNames="hover-marker icon-pin"/>
            </div>
        );
    }
});
