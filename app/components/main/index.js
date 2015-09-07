var React = require('react');
require('./reset.scss');
require('./style.scss');
require('./fonts/icon-font.scss');

var Map = require('../map');
var PicksDetail = require('../picks/picksDetail');
var Stats = require('../stats');
var Undo = require('../userPrompts/undo');

var Main = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {},
    render: function () {
        return (
            <div id="main"><PicksDetail/><Undo/><Map/><Stats/></div>
        );
    }
});

React.render(<Main/>, document.getElementById('app'));