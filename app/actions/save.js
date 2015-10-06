var Reflux = require('reflux');
var polyline = require('../utils/googleMaps/polyline');

var saveActions = Reflux.createActions([
    'save'
]);

saveActions.save.listen(() => {
    var elevations = require('../stores/elevations').toString();
    var routeStore = require('../stores/route').getState();
    var route = new google.maps.Polyline();
    var legs = routeStore.legs.map(leg => {
        route = polyline.join(route, leg.polyline);
        return polyline.encode(leg.polyline);
    });

    //console.log('save to local storage', {
    //    name: _store.name,
    //    elevations,
    //    legs,
    //    route: polyline.encode(route)
    //});

    window.localStorage.setItem(routeStore.name, JSON.stringify({
        name: routeStore.name,
        description: routeStore.description,
        elevations,
        legs,
        route: polyline.encode(route)
    }));
});

module.exports = saveActions;
