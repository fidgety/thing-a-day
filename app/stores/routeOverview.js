var Reflux = require('reflux');
var elevations = require('../utils/googleMaps/elevations');
var actions = require('../actions/map');
var polyline = require('../utils/googleMaps/polyline');

module.exports = Reflux.createStore({
    listenables: actions,

    onLoad(routeName) {
        var route = JSON.parse(window.localStorage.getItem(routeName));

        this.store.route = new google.maps.Polyline({
            path: polyline.decode(route.route)
        });

        this.store.distance = polyline.distance(this.store.route.getPath());

        this.store.name = routeName;
        this._loadElevations(route.elevations);

        this.trigger(this.store);
    },
    _loadElevations(loadedElevations) {
        loadedElevations.forEach(item => {
            this.store.elevations.push(item.elevation);
            this.store.locations.push(new google.maps.LatLng(item.location.lat, item.location.lng));
        });

        var stats = elevations.calculateUpsAndDowns(this.store.elevations);
        this.store.ascending = stats.ascending;
        this.store.descending = stats.descending;
        this.store.flatish = stats.flatish;
    },
    store: {
        route: undefined,
        distance: 0,
        startingLatLng: undefined,
        endLatLng: undefined,
        elevationHover: undefined,
        elevations: [],
        locations: [],
        name: '',
        ascending: 0,
        descending: 0,
        flatish: 0
    },
    getInitialState() {
        return this.store;
    }
});