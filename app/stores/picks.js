var Reflux = require('reflux');
var actions = require('../actions/map');
var picksActions = require('../actions/picks');
var find = require('../utils/array/find');

var cutleryFactory = require('./picksDb/cutlery-factory');
var glidingClub = require('./picksDb/gliding-club');
var stanageEdge = require('./picksDb/stanage-edge');
var theDale = require('./picksDb/the-dale');
var tissingtonTrail = require('./picksDb/tissington-trail');

var picks = [glidingClub, cutleryFactory, stanageEdge, theDale, tissingtonTrail];

module.exports = Reflux.createStore({
    listenables: [actions, picksActions],
    store: {
        picks: picks,
        highlighted: undefined
    },
    onLoad(routeName) {
        var route = JSON.parse(window.localStorage.getItem(routeName));
        var picksInRoute = route.picks.split(',');
        this.store.picks = picks.filter(pick => {
            return picksInRoute.indexOf(pick.name) !== -1;
        });
        this.trigger(this.store);
    },
    onPickHighlighted(name) {
        this.store.highlighted = find(this.store.picks, function (pick) {
            return pick.name === name;
        });
        this.trigger(this.store);
    },
    onPickUnhighlighted() {
        this.store.highlighted = undefined;
        this.trigger(this.store);
    },
    getPicksForBounds() {
        //this.store.picks = ['some picks from somewhere'];
        this.trigger(this.store);
    },
    getInitialState() {
        return this.store;
    }
});
