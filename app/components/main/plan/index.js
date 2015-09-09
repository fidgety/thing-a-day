require('./style.scss');

var React = require('react');

var Map = require('../../map');
var PicksDetail = require('../../picks/picksDetail');
var Stats = require('../../stats');
var UserPrompts = require('../../userPrompts');

module.exports = React.createClass({
    render: function () {
        return (
            <div id="plan"><PicksDetail/><UserPrompts/><Map/><Stats/></div>
        );
    }
});