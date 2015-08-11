var React = require('react');

var customMarker = require('./../../utils/googleMaps/customMarker');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    shouldComponentUpdate: function (nextProps) {
        return nextProps.key !== this.props.key;
    },
    componentWillUnmount: function () {
        this.state.marker.setMap(null);
    },
    render: function () {
        this.state.marker = customMarker(
            this.props.latLng,
            this.props.map
        );
        return null;
    }
});
