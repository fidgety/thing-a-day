require('./style.scss');

var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
        };
    },
    render: function () {
        return <div id="header"><div className="logo icon-teapot"></div></div>;
    }
});