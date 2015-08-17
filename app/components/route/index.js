var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            route: new google.maps.Polyline({
                path: [],
                strokeColor: '#0077ff',
                strokeWeight: 6,
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
    },
    render: function () {
        var currentPath = this.state.route.getPath();
        var newPath = this.props.route.getPath();
        var currentPathLength = currentPath.getLength();
        var newPathLength = newPath.getLength();

        this.state.route.setMap(this.props.map);

        for (var i = currentPathLength; i < newPathLength; i++) {
            currentPath.push(newPath.getAt(i));
        }

        return null;
    }
});
