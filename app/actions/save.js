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

    var picks = routeStore.legs.reduce((picks, leg) => {
        if (leg.pick) {
            picks.push(leg.pick.name);
        }
    }, []);

    window.localStorage.setItem(routeStore.name, JSON.stringify({
        name: routeStore.name,
        description: routeStore.description,
        elevations,
        legs,
        route: polyline.encode(route),
        picks: picks.join(',')
    }));
});

module.exports = saveActions;
