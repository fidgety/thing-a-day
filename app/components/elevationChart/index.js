require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var LineChart = require("react-chartjs").Line;
var elevationsStore = require('../../stores/elevations');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(elevationsStore, 'onElevationsChange')],
    getInitialState: function () {
        return {
            elevations: [1]
        };
    },
    onElevationsChange: function (elevations) {
        this.setState({
            elevations: elevations.elevations
        });
    },
    render: function () {
        var ops = {
            showScale: false,
            scaleShowGridLines: false,
            pointDot: false,
            responsive: true,
            maintainAspectRatio: false,
            datasetStrokeWidth: 1
        };

        var data = {
            labels: this.state.elevations,
            datasets: [
                {
                    label: "My First dataset",
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