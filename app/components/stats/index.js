require('./style.scss');

var React = require('react');

var ElevationChart = require('./elevationChart');
var Piechart = require('./piechart');

module.exports = React.createClass({
    render: function () {
        return <div id="stats">
            <div className="left">
                <ElevationChart elevations={this.props.elevations} positions={this.props.positions}/>
            </div>
            <div className="right">
                <Piechart
                    distance={this.props.distance}
                    ascending={this.props.ascending}
                    descending={this.props.descending}
                    flatish={this.props.flatish}
                />
            </div>
        </div>
    }
});