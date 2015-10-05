require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');

var routeStore = require('../../../stores/route');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(routeStore, 'onRouteChange')
    ],
    getInitialState() {
        return {
            routeStarted: false
        }
    },
    onRouteChange(route) {
        this.setState({
            routeStarted: route.startingLatLng
        });
    },
    render() {
        var activeClass = this.state.routeStarted ? 'undo-active' : '';

        return (
            <div id="undo" className={activeClass} onClick={actions.undo}>undo</div>
        );
    }
});