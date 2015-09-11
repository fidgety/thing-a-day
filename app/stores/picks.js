var Reflux = require('reflux');
var actions = require('../actions/map');
var find = require('../utils/array/find');

module.exports = Reflux.createStore({
    listenables: actions,
    store: {
        picks: [{
            name: 'gliding club',
            type: 'climb',
            tags: ['climb', 'view', 'quiet'],
            latLng: new google.maps.LatLng(53.320646, -1.650674),
            img: '/images/gliding-club.jpg',
            distance: 3423,
            elevation: 253
        }],
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
