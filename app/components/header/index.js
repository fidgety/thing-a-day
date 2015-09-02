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
    render: function () {
        return <div id="header"><div className="logo icon-teapot"></div></div>;
    }
});