var Reflux = require('reflux');
var actions = require('../actions/map');
var find = require('../utils/array/find');

module.exports = Reflux.createStore({
    listenables: actions,
    store: {
        picks: [],
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
        this.store.picks = [{
            name: 'gliding club',
            tags: ['climb', 'view', 'quiet'],
            latLng: 'thing',
            img: '/picks/gliding-club.jpg'
        }];
        this.trigger(this.store);
    },
    getInitialState() {
        return this.store;
    }
});
