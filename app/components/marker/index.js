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
    componentWillUnmount: function () {
        this.state.marker.setMap(null);
    },
    render: function () {
        console.log(this.props, 'marker')
        this.state.marker = customMarker(
            this.props.latLng,
            this.props.map,
            this.props.classNames || 'custom-marker icon-pin',
            this.props.tooltopDiv
        );
        return null;
    }
});
