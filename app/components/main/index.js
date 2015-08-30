var React = require('react');
require('./reset.scss');
require('./style.scss');
require('./fonts/icon-font.scss');

var Map = require('../Map');
var Header = require('../header');
var Stats = require('../stats');

var actions = require('../../actions/map');

var Main = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {},
    render: function () {
        return (
            <div id="main"><div className="undo" onClick={actions.undo}>undo</div><Map/><Stats/></div>
        );
    }
});

React.render(<Main/>, document.getElementById('app'));