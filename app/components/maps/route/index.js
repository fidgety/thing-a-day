require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var routeOverview = require('../../../stores/routeOverview');
var Route = require('../../route');

var mainMapOptions = require('../../../utils/googleMaps/mainMapOptions');
var Picks = require('../../picks/picksMarkers');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(routeOverview, 'onRouteOverviewChange')
    ],
    getInitialState: function () {
        return {
            map: undefined,
            route: undefined
        };
    },
    onRouteOverviewChange(route) {
        this.setState({
            route: route.route
        });
    },
    componentDidMount: function () {
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mainMapOptions);

        this.setState({
            map: map
        });

        google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
            google.maps.event.addListener(map, 'dragend', function () {
            });

            google.maps.event.addListener(map, 'click', function () {
            });

            google.maps.event.addListener(map, 'zoom_changed', function () {
            });
        });
    },
    render: function () {
        return (
            <div id="map">
                <Route route={this.state.route} map={this.state.map}/>
                <Picks map={this.state.map}/>
                <div id="map-canvas"></div>
            </div>);
    }
});
