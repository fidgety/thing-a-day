require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');
var picksStore = require('../../../stores/picks');
var picksActions = require('../../../actions/picks');

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
        var addDiv = document.createElement('div');
        var closeDiv = document.createElement('div');

        addDiv.innerHTML = '+';
        addDiv.className = 'picks-add';
        addDiv.onclick = function () {
            picksActions.pickSelected(pick);
            return false;
        };
        tooltipDiv.appendChild(addDiv);

        closeDiv.innerHTML = '-';
        closeDiv.className = 'picks-close';
        closeDiv.onclick = function () {
            actions.pickUnhighlighted(pick.name);
            return false;
        };
        tooltipDiv.appendChild(addDiv);
        tooltipDiv.appendChild(closeDiv);

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
                var decodedRoute = polylineUtils.decode(pick.route);
                var routeMiddle = decodedRoute[Math.floor(decodedRoute.length / 2)];

                var polyline = new google.maps.Polyline({
                    path: decodedRoute
                });
                return  <div key={'route-holder' + pick.name}>
                            <Route key={pick.name} route={polyline} map={this.props.map} strokeWeight="4" backgroundStrokeWeight="7" strokeColour="#CC2029" onClick={polyOnClick}/>
                            <Marker key={pick.name + 'start' + this.props.map} latLng={routeMiddle} map={this.props.map} classPrefix="climb" tooltopDiv={tooltipDiv} highlighted={highlighted} onclick={onclick}/>
                        </div>;
            }

            return <Marker key={pick.name + this.props.map} latLng={pick.latLng} map={this.props.map} classPrefix={pick.type} tooltopDiv={tooltipDiv} highlighted={highlighted} onclick={onclick}/>
        });
        return <div>{picks}</div>;
    }
});
