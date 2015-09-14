require('./style.scss');

var React = require('react');

var Undo = require('./undo');
var Save = require('./saveRoute');
var MetricImperial = require('./metricImperial');

module.exports = React.createClass({
    render: function () {
        return (
            <div id="prompts"><Undo/><Save/><MetricImperial/></div>
        );
    }
});