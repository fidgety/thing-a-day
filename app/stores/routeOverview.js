var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var polyline = require('../utils/googleMaps/polyline');

var optionsStore = require('./options');
var makeElevationMetric = optionsStore.createUnitAndValue.forElevation;
var makeDistanceMetric = optionsStore.createUnitAndValue.forDistance;

var _store = {
    route: undefined,
    distance: makeDistanceMetric(0),
    startingLatLng: undefined,
    endLatLng: undefined,
    elevationHover: undefined,
    elevations: [],
    locations: [],
    name: '',
    ascending: makeElevationMetric(0),
    descending: makeElevationMetric(0),
    flatish: makeElevationMetric(0),
    uphill: makeElevationMetric(0),
    downhill: makeElevationMetric(0)
};

module.exports = Reflux.createStore({
    listenables: actions,
    init() {
        this.listenTo(optionsStore, this.optionsUpdated);
    },
    optionsUpdated() {
        this._updateDistance();
        this._updateElevationMerics();
        this.trigger(_store);
    },
    onLoad(routeName) {
        var route = JSON.parse(window.localStorage.getItem(routeName));

        _store.route = new google.maps.Polyline({
            path: polyline.decode(route.route)
        });

        this._updateDistance();

        _store.name = routeName;
        this._loadElevations(route.elevations);

        this.trigger(_store);
    },
    _updateDistance() {
        if (_store.route) {
            _store.distance = makeDistanceMetric(polyline.distance(_store.route.getPath()));
        }
    },
    _updateElevationMerics() {
        var stats = elevations.calculateUpsAndDowns(_store.elevations);
        _store.ascending = makeElevationMetric(stats.ascending);
        _store.descending = makeElevationMetric(stats.descending);
        _store.flatish = makeElevationMetric(stats.flatish);
    },
    _loadElevations(loadedElevations) {
        loadedElevations.forEach(item => {
            _store.elevations.push(item.elevation);
            _store.locations.push(new google.maps.LatLng(item.location.lat, item.location.lng));
        });

        this._updateElevationMerics();
    },
    getState() {
        return _store;
    }
});