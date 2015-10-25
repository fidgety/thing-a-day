var React = require('react');

var PickMarker = require('../pickMarker');
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
            <PickMarker
                name={name}
                map={this.props.map}
                latLng={routeMiddle}
                type={this.props.type}
                highlighted={this.props.highlighted}
                onclick={this.props.onclick}
                onAdd={this.props.onAdd}
                onClose={this.props.onClose}
            />
        </div>;
    }
});


