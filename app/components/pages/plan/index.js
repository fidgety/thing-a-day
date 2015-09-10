require('./style.scss');

var React = require('react');

var Map = require('../../map/index');
var PicksDetail = require('../../picks/picksDetail/index');
var Stats = require('../../stats/index');
var UserPrompts = require('../../userPrompts/index');

module.exports = React.createClass({
    render: function () {
        return (
            <div id="plan"><PicksDetail/><UserPrompts/><Map/><Stats/></div>
        );
    }
});