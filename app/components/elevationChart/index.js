require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var LineChart = require("react-chartjs").Line;
var elevationsStore = require('../../stores/elevations');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(elevationsStore, 'onElevationsChange')],
    getInitialState: function () {
        return {
            elevations: [1],
            labels: [0],
            positions: []
        };
    },
    onElevationsChange: function (elevations) {
        this.setState({
            elevations: elevations.elevations,
            positions: elevations.positions
        });
    },
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
                    return console.log('event no pin')
                }
                var text = tooltip.text;
                var colonPos = text.indexOf(':');
                var elevation = text.slice(colonPos + 1);
                var posInArray = that.state.elevations.indexOf(parseFloat(elevation));
                console.log('action hover pin', that.state.positions[posInArray]);
            }
        };

        var data = {
            labels: this.state.elevations,
            datasets: [
                {
                    fillColor: "rgba(0,0,0,0)",
                    strokeColor: "white",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: this.state.elevations
                }
            ]
        };

        return <div id="elevations"><LineChart data={data} options={ops}/></div>;
    }
});