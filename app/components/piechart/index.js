require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var Pie = require('react-chartjs').Pie;
var Ticker = require('../ticker');

var routeStore = require('../../stores/route');
var elevationsStore = require('../../stores/elevations');


var options = {
    //showTooltips: false,
    segmentShowStroke: false,
    percentageInnerCutout: 70,
    animationEasing: 'easeOutQuart',
    animationSteps: 40
};

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(routeStore, 'onRouteChange'),
        Reflux.listenTo(elevationsStore, 'onElevationsChange')
    ],
    getInitialState: function () {
        return {
            distance: 0,
            ascending: 0,
            descending: 0,
            flatish: 0
        };
    },
    onRouteChange(route) {
        var distanceInKm = (route.distance / 1000).toFixed(1);
        this.setState({
            distance: distanceInKm
        })
    },
    onElevationsChange(elevations) {
        this.setState({
            ascending: parseInt(elevations.ascending, 10),
            descending: parseInt(elevations.descending, 10),
            flatish: parseInt(elevations.flatish, 10)
        });
    },
    render: function () {
        var data = [
            {
                value: this.state.ascending || 1,
                color:"#FF6633",
                highlight: "#FF5A5E",
                label: "ascending"
            },
            {
                value: this.state.flatish || 0,
                color: "#FEE71A",
                highlight: "#FFC870",
                label: "flat (sort of)"
            },
            {
                value: this.state.descending || 1,
                color: "#ABCA43",
                highlight: "#5AD3D1",
                label: "descending"
            }
        ];

        return <div>
            <div id="piechart">
                <div className="ascdesc asc"><Ticker value={this.state.descending} animate="true" decimalPlaces="0"/>
                    <span className="m">m</span>
                </div>
                <div className="distance"><Ticker value={this.state.distance} animate="true" decimalPlaces="1"/>
                    <div className="km">km</div>
                </div>
                <Pie data={data} options={options}/>
                <div className="ascdesc desc"><Ticker value={this.state.ascending} animate="true" decimalPlaces="0"/>
                    <span className="m">m</span>
                </div>
            </div>
        </div>
    }
});

