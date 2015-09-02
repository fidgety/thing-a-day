require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');

var Picks = require('../../../stores/picks');

module.exports = React.createClass({
    getInitialState: function () {
        return {};
    },
    onElevationsChange: function (thing) {
        this.setState({
            thing
        });
    },
    render: function () {
        return (
            <div id="picks">
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
        );
    }
});