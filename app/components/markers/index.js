require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var routeStore = require('../../stores/route');

var Marker = require('../marker');

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
                <Marker key={'s' + this.state.start} latLng={this.state.start} map={this.props.map} classPrefix="start"/>
                <Marker key={'e' + this.state.end} latLng={this.state.end} map={this.props.map} classPrefix="end"/>
                <Marker key={'eh' + this.state.elevationHover} latLng={this.state.elevationHover} map={this.props.map} classPrefix="hover"/>
            </div>
        );
    }
});
