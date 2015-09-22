require('./style.scss');

var React = require('react');
var Reflux = require('reflux');
var optionsStore = require('../../../stores/options');
var actions = require('../../../actions/map');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(optionsStore, 'onOptionsChange')
    ],
    getInitialState: function () {
        return {
            metric: true,
        };
    },
    onOptionsChange(newOptions) {
        this.setState({
            metric: newOptions.metric
        })
    },
    render: function () {
        var metricLabel = this.state.metric ? 'km/m' : 'm/feet';
        var metricClick = function () {
            actions.measurementChanged(!this.state.metric);
        }.bind(this);

        return (
            <div className="metric-imperial" onClick={metricClick}>{metricLabel}</div>
        );
    }
});
