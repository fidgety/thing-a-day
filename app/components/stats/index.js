require('./style.scss');

var React = require('react');

var ElevationChart = require('../elevationChart');
var Piechart = require('../piechart');

module.exports = React.createClass({
    render: function () {
        return <div id="stats">
            <div className="left">
                <ElevationChart/>
            </div>
            <div className="right">
                <Piechart/>
            </div>
        </div>
    }
});