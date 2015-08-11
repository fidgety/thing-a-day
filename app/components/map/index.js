var React = require('react');
var Reflux = require('reflux');

var actions = require('../../actions/waypointRequested');
var waypointsStore = require('../../stores/waypoints');

require('./style.scss');

var customMarker = require('./customMarker');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(waypointsStore, 'onWaypointsChange')],
    getInitialState: function () {
        return {
            map: undefined
        };
    },
    onWaypointsChange: function (waypoints) {
        customMarker(waypoints[waypoints.length - 1], this.state.map)
    },
    componentDidMount: function () {
        var mapOptions = {
            center: {lat: 53.32067152309183, lng: -1.6504383087158},
            zoom: 10,
            styles: snazzyMap,
            disableDefaultUI: true
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

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
        return (<div id="map"><div id="map-canvas"></div></div>);
    }
});

var snazzyMap = [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}];
