require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');
var picksStore = require('../../../stores/picks');
var picksActions = require('../../../actions/picks');

var Marker = require('../../marker');
var PickRoute = require('./pickRoute');

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

            if (pick.type === 'climb' || pick.type === 'rouleur') {
                return <PickRoute
                    name={pick.name}
                    map={this.props.map}
                    route={pick.route}
                    colour={pick.type === 'rouleur' ? '#60A589' : '#CC2029'}
                    polyonclick={polyOnClick}
                    tooltipdiv={tooltipDiv}
                    highlighted={highlighted}
                    onclick={onclick}
                    type={pick.type}
                />;
            }

            return <Marker key={pick.name + this.props.map} latLng={pick.latLng} map={this.props.map} classPrefix={pick.type} tooltopDiv={tooltipDiv} highlighted={highlighted} onclick={onclick}/>
        });
        return <div>{picks}</div>;
    }
});
