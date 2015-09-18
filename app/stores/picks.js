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
            stats: {
                distance: 3423,
                elevation: 253
            },
            description: 'It\'s a long, and I\'ll be honest - it\'s not the easiest, but hell it\'s rewarding! Start just off the A6187 near Hathersage cutlery factory (where hopefully you had a  good stop). It\'s a very quiet road so enjoy some side-by-side riding as you rise out of the Hope Valley and head to the tiny hamlet of Abney; you\'ll pass a really interesting hall farm, probably some Buzzards on the way. The landscape slowly shifts from those pleasant lowlands to classic brooding moorland by the end. If you\'re lucky you\'ll see a glider apparently defy gravity and fairly float away - and wait until you get around the corner.'
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
