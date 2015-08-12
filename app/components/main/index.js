var React = require('react');
require('./reset.scss');
require('./style.scss');
require('./fonts/icon-font.scss');

var Map = require('../Map');
var Elevations = require('../elevations');

var Main = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {},
    render: function () {
        return (
            <div id="main"><Map></Map><Elevations></Elevations></div>
        );
    }
});

React.render(<Main/>, document.getElementById('app'));