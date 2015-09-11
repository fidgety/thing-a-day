require('./style.scss');

var React = require('react');

var LineChart = require('react-chartjs').Line;

var actions = require('../../../actions/map');

module.exports = React.createClass({
    render: function () {
        var that = this;
        var ops = {
            showScale: false,
            scaleShowGridLines: false,
            pointDot: false,
            responsive: true,
            maintainAspectRatio: false,
            datasetStrokeWidth: 1,
            showTooltips: true,
            customTooltips: function (tooltip) {
                if (!tooltip) {
                    return actions.elevationHover(undefined);
                }
                var text = tooltip.text;
                var colonPos = text.indexOf(':');
                var elevation = text.slice(colonPos + 1);
                var posInArray = that.props.elevations.indexOf(parseFloat(elevation));
                actions.elevationHover(that.props.positions[posInArray]);
            }
        };

        var data = {
            labels: this.props.elevations,
            datasets: [
                {
                    fillColor: 'rgba(0,0,0,0)',
                    strokeColor: 'white',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: this.props.elevations
                }
            ]
        };

        return <div id="elevations"><LineChart data={data} options={ops}/></div>;
    }
});