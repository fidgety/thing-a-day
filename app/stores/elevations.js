var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var routeUtils = require('../utils/googleMaps/route');
var flattenArray = require('../utils/array/flatten');

module.exports = Reflux.createStore({
    listenables: actions,
    onUndo() {
        this.store.legs.pop();
        this._updateStoreWithNewValues();
    },
    onRouteUpdated(latLngs) {
        var that = this;

        elevations.getElevations(routeUtils.makeSamplePoints(latLngs, undefined, 1000), function (results) {
            that._addLeg(results);
            that._updateStoreWithNewValues();
        });
    },
    store: {
        elevations: [],
        positions: [],
        legs: [],
        ascending: 0,
        descending: 0,
        flatish: 0
    },
    toString() {
        return this.store.elevations.map((elevation, i) => {
            return {
                elevation: elevation,
                location: {
                    lat: this.store.positions[i].lat(),
                    lng: this.store.positions[i].lng()
                }
            }
        });
    },
    getInitialState() {
        return this.store;
    },
    _updateStoreWithNewValues() {
        this._updateElevations();
        this._updateAscDesc();
        this.trigger(this.store);
    },
    _addLeg(newElevations) {
        this.store.legs.push(newElevations);
    },
    _updateElevations() {
        var store = this.store;
        var allElevations = flattenArray(store.legs);

        store.elevations = [];
        store.positions = [];

        allElevations.forEach(elevation => {
            store.elevations.push(elevation.elevation);
            store.positions.push(elevation.location);
        });
    },
    _updateAscDesc() {
        var stats = elevations.calculateUpsAndDowns(this.store.elevations);
        this.store.ascending = stats.ascending;
        this.store.descending = stats.descending;
        this.store.flatish = stats.flatish;
    }
});
