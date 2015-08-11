var React = require('react');
var Reflux = require('reflux');

var actions = require('../../actions/map');
var waypointsStore = require('../../stores/waypoints');

var mapOptions = require('./mapOptions');

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
