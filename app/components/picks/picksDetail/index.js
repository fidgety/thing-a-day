require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

//var actions = require('../../../actions/map');

var picksStore = require('../../../stores/picks');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(picksStore, 'onPicksChange')
    ],
    getInitialState: function () {
        return {
            highlighted: undefined
        };
    },
    onPicksChange: function (picksStore) {
        this.setState({
            highlighted: picksStore.highlighted
        });
    },
    render: function () {
        var activeClass = this.state.highlighted ? 'picks-active' : '';

        return (
            <div id="picks" className={activeClass}>
                <div className="outer">
                    <ul className="inner">
                        <li>
                            <h4>climb</h4>
                            <h3>Gliding Club</h3>
                            <img src="images/gliding-club.jpg"/>
                            <div className="info">
                                <div className="distance">3.4km</div>
                                <div className="ascending">193m</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});