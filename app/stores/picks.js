var Reflux = require('reflux');
var actions = require('../actions/map');
var find = require('../utils/array/find');

var cutleryFactory = require('./picksDb/cutlery-factory');
var glidingClub = require('./picksDb/gliding-club');
var stanageEdge = require('./picksDb/stanage-edge');
var theDale = require('./picksDb/the-dale');
var tissingtonTrail = require('./picksDb/tissington-trail');

module.exports = Reflux.createStore({
    listenables: actions,
    store: {
        picks: [glidingClub, cutleryFactory, stanageEdge, theDale, tissingtonTrail],
        highlighted: undefined
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
