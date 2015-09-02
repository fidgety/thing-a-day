require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../actions/map');
var waypointsStore = require('../../stores/waypoints');
var routeStore = require('../../stores/route');

var mainMapOptions = require('./../../utils/googleMaps/mainMapOptions');
var Markers = require('../markers');
var Marker = require('../marker');
var Legs = require('../legs');
var Picks = require('../picks/picksMarkers');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(waypointsStore, 'onWaypointsChange'),
        Reflux.listenTo(routeStore, 'onRouteChange')
    ],
    getInitialState: function () {
        return {
            map: undefined,
            waypoints: [],
            route: new google.maps.Polyline(),
            legs: []
        };
    },
    onWaypointsChange(waypoints) {
        this.setState({
            waypoints
        });
    },
    onRouteChange(route) {
        this.setState({
            route: route.path,
            legs: route.legs
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

            google.maps.event.addListener(map, 'click', function (e) {
                actions.mapClicked(e.latLng);
            });

            google.maps.event.addListener(map, 'zoom_changed', function () {
            });
        });
    },
    render: function () {
        var that = this;
        var markers = this.state.waypoints.map(function (waypoint) {
            return <Marker key={waypoint.key} latLng={waypoint.latLng} map={that.state.map}></Marker>
        });
        return (
            <div id="map">
                <Legs legs={this.state.legs} map={this.state.map}/>
                <Markers map={this.state.map}/>
                <Picks map={this.state.map}/>
                <div id="map-canvas"></div>
            </div>);
    }
});
