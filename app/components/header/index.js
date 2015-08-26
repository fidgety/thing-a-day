require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../actions/map');

var Stats = require('../stats');

module.exports = React.createClass({
    getInitialState: function () {
        return {
        };
    },
    onElevationsChange: function (thing) {
        this.setState({
            thing
        });
    },
    render: function () {
        return <div id="header"><h1>Thing-a-day</h1><div onClick={actions.undo}>undo</div><Stats/></div>;
    }
});