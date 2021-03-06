require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');
var routeStore = require('../../../stores/route');

var mainMapOptions = require('../../../utils/googleMaps/mainMapOptions');
var Markers = require('../../markers');
var Legs = require('../../legs');
var Picks = require('../../picks/picksMap');
var UserLocation = require('../../userLocation');

var _lookupInProgress = false;

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
        _lookupInProgress = false;
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

        var timer;

        google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
            google.maps.event.addListener(map, 'dragend', function () {
            });

            google.maps.event.addListener(map, 'click', function (e) {
                if (!timer && !_lookupInProgress) {
                    timer = setTimeout(function () {
                        _lookupInProgress = true;
                        console.log(e.latLng.toString());
                        actions.mapClicked(e.latLng);
                        timer = undefined;
                    }, 200);
                }
            });

            google.maps.event.addListener(map, 'dblclick', function () {
                clearTimeout(timer);
                timer = undefined;
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
                <UserLocation map={this.state.map}/>
                <div id="map-canvas"></div>
            </div>);
    }
});
