var React = require('react');
require('./reset.scss');
require('./style.scss');
require('./fonts/icon-font.scss');

var Map = require('../Map');
var ElevationChart = require('../elevationChart');
var Header = require('../header');
var Stats = require('../stats');
var Piechart = require('../piechart');

var actions = require('../../actions/map');

var Main = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {},
    render: function () {
        return (
            <div id="main"><Header/><div className="undo" onClick={actions.undo}>undo</div><Piechart/><Map></Map><ElevationChart/></div>
        );
    }
});

React.render(<Main/>, document.getElementById('app'));