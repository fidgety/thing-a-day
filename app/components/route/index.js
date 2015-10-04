var React = require('react');
var polylineUtils = require('../../utils/googleMaps/polyline');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            route2: new google.maps.Polyline({
                path: [],
                strokeColor: 'rgba(0,0,0,0.3)',
                strokeWeight: 12,
                map: this.props.map
            }),
            route: new google.maps.Polyline({
                path: [],
                strokeColor: '#FF6633',
                strokeWeight: 4,
                map: this.props.map
            })
        };
    },
    shouldComponentUpdate: function (nextProps) {
        this.state.route.setMap(nextProps.map);
        this.state.route2.setMap(nextProps.map);

        this.state.route.setOptions({strokeColor:nextProps.strokeColour || '#FF6633'});
        this.state.route2.setOptions({strokeColor:nextProps.backgroundStrokeColour || 'rgba(0,0,0,0.3)'});

        this.state.route.setOptions({strokeWeight:nextProps.strokeWeight || 4});
        this.state.route2.setOptions({strokeWeight:nextProps.backgroundStrokeWeight || 12});

        google.maps.event.addListener(this.state.route, 'click', (e) => {
            this.props.onClick(e);
        });
        google.maps.event.addListener(this.state.route2, 'click', (e) => {
            this.props.onClick(e);
        });

        return nextProps.route !== undefined
            && this.state.route.getPath().getLength() !== nextProps.route.getPath().getLength();
    },
    componentDidMount() {
    },
    componentWillUnmount: function () {
        this.state.route.setMap(null);
        this.state.route2.setMap(null);
    },
    render: function () {
        if (this.props.route) {
            var newPath = this.props.route.getPath().getArray();
            var route = this.state.route.getPath();
            var route2 = this.state.route2.getPath();

            newPath.forEach((latLng, count) => {
                //setTimeout(function () {
                    route2.push(newPath[count]);
                    route.push(newPath[count]);
                //}, count * 50);
            });
            
            if (this.props.fitToMap) {
                this.props.map.fitBounds(polylineUtils.toBounds(this.state.route));
            }
        }
        return null;
    }
});
