var React = require('react');

var customMarker = require('./../../utils/googleMaps/customMarker');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    shouldComponentUpdate: function (nextProps) {
        if (!nextProps.latLng) {
            return false;
        }

        if (!this.props.latLng && nextProps.latLng) {
            return true;
        }

        return nextProps.latLng.toString() !== this.props.latLng.toString();
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.highlighted !== this.props.highlighted) {
            nextProps.highlighted ? this.state.marker.onHighlighted() : this.state.marker.offHighlighted()
        }
    },
    componentWillUnmount: function () {
        this.state.marker.setMap(null);
    },
    render: function () {
        this.state.marker = customMarker(
            this.props.latLng,
            this.props.map,
            this.props.classPrefix,
            this.props.tooltopDiv,
            this.props.onclick
        );
        return null;
    }
});
