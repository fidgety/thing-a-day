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
            picks: picksStore.getInitialState()
        };
    },
    onPicksChange(picks) {
        this.setState({
            picks
        });
    },
    render: function () {
        var pickMarkers = this.state.picks.picks.map((pick) => {
            var tooltipDiv = document.createElement('div');
            var goHereDiv = document.createElement('div');
            var highlighted = false;
            if (this.state.picks.highlighted) {
                highlighted = pick.name === this.state.picks.highlighted.name;
            }
            goHereDiv.innerHTML = 'go here';
            goHereDiv.onclick = function () {
                actions.mapClicked(pick.latLng);
                return false;
            };
            tooltipDiv.appendChild(goHereDiv);
            var onclick = function (currentlyHighlighted) {
                if (!currentlyHighlighted) {
                    actions.pickHighlighted(pick.name);
                } else {
                    actions.pickUnhighlighted(pick.name);
                }
            };
            return <Marker key={pick.name + this.props.map} latLng={pick.latLng} map={this.props.map} classPrefix="picks" tooltopDiv={tooltipDiv} highlighted={highlighted} onclick={onclick}/>
        });
        return <div>{pickMarkers}</div>;
    }
});
