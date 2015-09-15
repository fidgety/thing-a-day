require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');

var optionsStore = require('../../../stores/options');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(optionsStore, 'onOptionsChange')
    ],
    getInitialState: function () {
        return {
            metric: optionsStore.getState().metric
        };
    },
    onOptionsChange: function (newOptionsStoreValues) {
        this.setState({
            metric: newOptionsStoreValues.metric
        });
    },
    render: function () {
        var text = this.state.metric ? 'metric' : 'imperial';

        return (
            <div
                id="metricImperial"
                onClick={() => {actions.measurementChanged(!this.state.metric)}}>
            {text}</div>
        );
    }
});