var Reflux = require('reflux');
var mapMethods = require('../utils/googleMaps/directions');
var routeMethods = require('../utils/googleMaps/route');
var actions = require('../actions/map');

module.exports = Reflux.createStore({
    listenables: actions,
    _routeStarted() {
        return this.store.getPath().length > 0;
    },
    _previousWaypoint() {
        var path = this.store.getPath();
        return path.getAt(path.getLength()-1)
    },
    _updatePath(newLatLngs) {
        var path = this.store.getPath();
        newLatLngs.forEach(latLng => path.push(latLng));
    },
    onNewWaypoint(latLng) {
        var that = this;
        if (this._routeStarted()) {
            mapMethods.getDirections(this._previousWaypoint(), latLng, function (route) {
                var newRouteLatLngs = routeMethods.routeToLatLngs(route);
                that._updatePath(newRouteLatLngs);
                actions.routeUpdated(newRouteLatLngs);
                that.trigger(that.store);
            })
        } else {
            this.store.getPath().push(latLng);
        }

    },
    store: new google.maps.Polyline({
        path: []
    }),
    getInitialState() {
        return this.store;
    }
});
