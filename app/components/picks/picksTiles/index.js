require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var picksActions = require('../../../actions/picks');

var picksStore = require('../../../stores/picks');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(picksStore, 'onPicksChange')
    ],
    getInitialState: function () {
        return {
            picks: []
        }
    },
    onPicksChange(picks) {
        this.state.picks = picks.picks;
    },
    componentDidUpdate() {
    },
    componentDidMount() {
    },
    render() {
        var pickList = this.state.picks.map(pick => {
            return <li className={pick.type} key={pick.name}>
                <img src={pick.img[0]}/>
                <div className="info">
                    <h4>{pick.type}</h4>
                    <h3>{pick.name}</h3>
                </div>
            </li>;
        });

        return (
            <div id="picksTiles">
                <h2>Picks on this route</h2>
                <ul>{pickList}</ul>
            </div>);
    }
});
