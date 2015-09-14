require('./style.scss');

var React = require('react');

var Pie = require('react-chartjs').Pie;
var Ticker = require('../../ticker');


var options = {
    //showTooltips: false,
    segmentShowStroke: false,
    percentageInnerCutout: 90,
    animationEasing: 'easeOutQuart',
    animationSteps: 40
};

module.exports = React.createClass({
    render: function () {
        var data = [
            {
                value: this.props.ascending || 1,
                color:'#FF6633',
                highlight: '#FF5A5E',
                label: 'ascending'
            },
            {
                value: this.props.flatish || 0,
                color: '#FEE71A',
                highlight: '#FFC870',
                label: 'flat (sort of)'
            },
            {
                value: this.props.descending || 1,
                color: '#ABCA43',
                highlight: '#5AD3D1',
                label: 'descending'
            }
        ];

        return <div id="piechart">
                <div className="ascdesc desc icon-arrow-down2"><Ticker value={this.props.descending} animate="true" decimalPlaces="0"/>
                    <span className="m">m</span>
                </div>
                <div className="distance"><Ticker value={this.props.distance.value} animate="true" decimalPlaces="1"/>
                    <div className="km">{this.props.distance.unit}</div>
                </div>
                <Pie data={data} options={options}/>
                <div className="ascdesc asc icon-arrow-up2"><Ticker value={this.props.ascending} animate="true" decimalPlaces="0"/>
                    <span className="m">m</span>
                </div>
            </div>
    }
});

