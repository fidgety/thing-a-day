require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var customMarker = require('./../../utils/googleMaps/customMarker');

var userLocationStore = require('./../../stores/userLocation');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(userLocationStore, 'onLocationChange')
    ],
    onLocationChange(location) {
        this.setState({
            location
        });
    },
    getInitialState: function () {
        return {
            location: undefined
        };
    },
    componentWillUnmount: function () {
        this.state.marker.setMap(null);
    },
    render: function () {
        if (!this.state.location) {
            return null
        }

        if (this.state.marker) {
            this.state.marker.setMap(null);
        }

        this.state.marker = customMarker(
            this.state.location,
            this.props.map,
            'user-location'
        );
        return null;
    }
});
