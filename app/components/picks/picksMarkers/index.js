require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');
var picksStore = require('../../../stores/picks');

var Marker = require('../../marker');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(picksStore, 'onPicksChange')
    ],

    getInitialState: function () {
        return {
            picks: picksStore.getInitialState().picks
        };
    },
    onPicksChange(picks) {
        this.setState({
            picks
        });
    },
    render: function () {
        console.log(this.props)
        var pickMarkers = this.state.picks.map((pick) => {
            return <Marker key={pick.name + this.props.map} latLng={pick.latLng} map={this.props.map} classNames="picks-marker start-picks-marker icon-pin"/>
        });
        console.log(pickMarkers)
        return <div>{pickMarkers}</div>;
    }
});
