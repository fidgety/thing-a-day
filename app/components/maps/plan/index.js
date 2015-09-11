require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');
var routeStore = require('../../../stores/route');

var mainMapOptions = require('../../../utils/googleMaps/mainMapOptions');
var Markers = require('../../markers');
var Legs = require('../../legs');
var Picks = require('../../picks/picksMarkers');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(routeStore, 'onRouteChange')
    ],
    getInitialState: function () {
        return {
            map: undefined,
            legs: []
        };
    },
    onRouteChange(route) {
        this.setState({
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
        return (
            <div id="map">
                <Legs legs={this.state.legs} map={this.state.map}/>
                <Markers map={this.state.map}/>
                <Picks map={this.state.map}/>
                <div id="map-canvas"></div>
            </div>);
    }
});
