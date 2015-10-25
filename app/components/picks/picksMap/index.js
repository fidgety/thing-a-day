require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');
var picksStore = require('../../../stores/picks');
var picksActions = require('../../../actions/picks');

var PickRoute = require('./pickRoute');
var PickMarker = require('./pickMarker');

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
        var picks = this.state.picks.picks.map((pick) => {
            var onAdd = function () {
                picksActions.pickSelected(pick);
            };

            var onClose = function () {
                actions.pickUnhighlighted(pick.name);
            };

            var onclick = function (currentlyHighlighted) {
                if (!currentlyHighlighted) {
                    actions.pickHighlighted(pick.name);
                } else {
                    onClose();
                }
            };

            var highlighted = this.state.picks.highlighted && pick.name === this.state.picks.highlighted.name;

            if (pick.type === 'climb' || pick.type === 'rouleur') {
                return <PickRoute
                    name={pick.name}
                    map={this.props.map}
                    route={pick.route}
                    colour={pick.type === 'rouleur' ? '#60A589' : '#CC2029'}
                    polyonclick={onAdd}
                    highlighted={highlighted}
                    onclick={onclick}
                    type={pick.type}
                    onAdd={onAdd}
                    onClose={onClose}
                />;
            }

            return <PickMarker
                name={pick.name}
                map={this.props.map}
                latLng={pick.latLng}
                type={pick.type}
                highlighted={highlighted}
                onclick={onclick}
                onAdd={onAdd}
                onClose={onClose}
            />
        });
        return <div>{picks}</div>;
    }
});
