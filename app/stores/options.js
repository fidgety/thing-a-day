var Reflux = require('reflux');
var actions = require('../actions/map');

var metreToKm = 1000;
var metreToMile = 1609.34400061;

module.exports = Reflux.createStore({
    listenables: actions,
    store: {
        metric: true,
        distanceConverter: metreToKm,
        distanceUnit: 'km'
    },
    onMeasurementChanged(metric) {
        this.store.metric = metric;
        this.store.distanceConverter = metric ? metreToKm : metreToMile;
        this.store.distanceUnit = metric ? 'km' : 'm';
        this.trigger(this.store);
    },
    getInitialState() {
        return this.store;
    }
});
