require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');
var picksStore = require('../../../stores/picks');

var Marker = require('../../marker');
var Route = require('../../route');

var polylineUtils = require('../../../utils/googleMaps/polyline');

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
    _makeToolTip: function (pick) {
        var tooltipDiv = document.createElement('div');
        var goHereDiv = document.createElement('div');

        goHereDiv.innerHTML = 'go here';
        goHereDiv.onclick = function () {
            actions.mapClicked(pick.latLng);
            actions.pickUnhighlighted(pick.name);
            return false;
        };
        tooltipDiv.appendChild(goHereDiv);
        return tooltipDiv;
    },
    render: function () {
        var picks = this.state.picks.picks.map((pick) => {
            var onclick = function (currentlyHighlighted) {
                if (!currentlyHighlighted) {
                    actions.pickHighlighted(pick.name);
                } else {
                    actions.pickUnhighlighted(pick.name);
                }
            };

            var polyOnClick = function () {
                actions.pickHighlighted(pick.name);
            };

            var highlighted = this.state.picks.highlighted && pick.name === this.state.picks.highlighted.name;
            var tooltipDiv = this._makeToolTip(pick);

            if (pick.type === 'climb') {
                var polyline = new google.maps.Polyline({
                    path: polylineUtils.decode(pick.route)
                });
                return <Route key={pick.name} route={polyline} map={this.props.map} strokeColour="#CC2029" onClick={polyOnClick}/>;
            }

            return <Marker key={pick.name + this.props.map} latLng={pick.latLng} map={this.props.map} classPrefix="picks" tooltopDiv={tooltipDiv} highlighted={highlighted} onclick={onclick}/>
        });
        return <div>{picks}</div>;
    }
});
