var React = require('react');

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
        return this.state.route.getPath().getLength() !== nextProps.route.getPath().getLength();
    },
    componentDidMount() {
    },
    componentWillUnmount: function () {
        this.state.route.setMap(null);
        this.state.route2.setMap(null);
    },
    render: function () {
        var newPath = this.props.route.getPath().getArray();
        var route = this.state.route.getPath();
        var route2 = this.state.route2.getPath();

        this.state.route2.setMap(this.props.map);
        this.state.route.setMap(this.props.map);

        newPath.forEach((latLng, count) => {
            setTimeout(function () {
                route2.push(newPath[count]);
                route.push(newPath[count]);
            }, count);
        });

        return null;
    }
});
