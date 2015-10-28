var Reflux = require('reflux');
var actions = require('../actions/map');

var metreToKm = 1000;
var metreToMile = 1609.34400061;
var metreToMetre = 1;
var metreToFeet = 0.30479999953;

var store = {
    metric: true,
    distanceConverter: metreToKm,
    distanceUnit: 'km',
    elevationConverter: metreToMetre,
    elevationUnit: 'm',
    sampleRate: 1000
};

module.exports = Reflux.createStore({
    listenables: actions,
    store: store,
    onMeasurementChanged(metric) {
        this.store.metric = metric;
        this.store.distanceConverter = metric ? metreToKm : metreToMile;
        this.store.distanceUnit = metric ? 'km' : 'miles';
        this.store.elevationConverter = metric ? metreToMetre : metreToFeet;
        this.store.elevationUnit = metric ? 'm' : 'feet';
        this.trigger(this.store);
    },
    createUnitAndValue: {
        forElevation(metres) {
            return {
                value: parseInt(metres / store.elevationConverter, 10),
                unit: store.elevationUnit
            }
        },
        forDistance(metres) {
            return {
                value: (metres / store.distanceConverter).toFixed(1) || 0,
                unit: store.distanceUnit
            };
        }
    },
    getState() {
        return this.store;
    }
});
