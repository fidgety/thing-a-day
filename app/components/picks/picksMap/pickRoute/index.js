var React = require('react');

var Marker = require('../../../marker');
var Route = require('../../../route');

var polylineUtils = require('../../../../utils/googleMaps/polyline');

module.exports = React.createClass({
    render() {
        var decodedRoute = polylineUtils.decode(this.props.route);
        var routeMiddle = decodedRoute[Math.floor(decodedRoute.length / 2)];
        var name = this.props.name;

        var polyline = new google.maps.Polyline({
            path: decodedRoute
        });

        return  <div key={'route-holder' + name}>
            <Route key={name} route={polyline} map={this.props.map} strokeWeight="4" backgroundStrokeWeight="7" strokeColour={this.props.colour} onClick={this.props.polyonclick}/>
            <Marker key={name + 'start' + this.props.map} latLng={routeMiddle} map={this.props.map} classPrefix={this.props.type} tooltopDiv={this.props.tooltipDiv} highlighted={this.props.highlighted} onclick={this.props.onclick}/>
        </div>;
    }
});


