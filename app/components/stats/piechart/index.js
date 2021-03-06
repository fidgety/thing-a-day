require('./style.scss');

var React = require('react');

var Pie = require('react-chartjs').Pie;
var Ticker = require('../../ticker');


var options = {
    //showTooltips: false,
    segmentShowStroke: false,
    percentageInnerCutout: 70,
    animationEasing: 'easeOutQuart',
    animationSteps: 40
};

module.exports = React.createClass({
    render: function () {
        var data = [
            {
                value: this.props.uphill.value || 1,
                color:'#FF6339',
                highlight: '#FF5A5E',
                label: 'ascending'
            },
            {
                value: this.props.flatish.value || 1,
                color: '#ffd339',
                highlight: '#FFC870',
                label: 'flat (sort of)'
            },
            {
                value: this.props.downhill.value || 1,
                color: '#2ecc71',
                highlight: '#5AD3D1',
                label: 'descending'
            }
        ];

        return <div id="piechart">
                <div className="ascdesc desc icon-arrow-down2"><Ticker value={this.props.descending.value} animate="true" decimalPlaces="0"/>
                    <span className="m">{this.props.descending.unit}</span>
                </div>
                <div className="distance"><Ticker value={this.props.distance.value} animate="true" decimalPlaces="1"/>
                    <div className="km">{this.props.distance.unit}</div>
                </div>
                <Pie data={data} options={options}/>
                <div className="ascdesc asc icon-arrow-up2"><Ticker value={this.props.ascending.value} animate="true" decimalPlaces="0"/>
                    <span className="m">{this.props.descending.unit}</span>
                </div>
            </div>
    }
});

