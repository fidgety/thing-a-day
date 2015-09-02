var React = require('react');
var Reflux = require('reflux');
var TestUtils = require('react/addons').addons.TestUtils;
var picks = require('../../app/stores/picks');
var actions = require('../../app/actions/map');

var unlisten;

describe('picks store', function () {
    afterEach(function () {
        unlisten && unlisten();
    });

    it('should return an initial state', function () {
        var initialState = picks.getInitialState();
        expect(initialState.highlighted).to.equal(undefined);
        expect(initialState.picks).to.be.a('array');
    });
    
    it('should provide a list of picks for the area specified', function (done) {
        // this is clearly a stub, but reflects something i think is important that it will do
        unlisten = picks.listen(function (store) {
            store.picks.length.should.not.equal(0);
            done();
        });
        picks.getPicksForBounds();
    });

    it('should reflect that a pick has been highlighted', function (done) {
        picks.getPicksForBounds();

        unlisten = picks.listen(function (store) {
            store.highlighted.name.should.equal('gliding club');
            done();
        });

        actions.pickHighlighted('gliding club');
    });

    it('should reflect that a pick has been highlighted', function (done) {
        picks.getPicksForBounds();
        //actions.pickHighlighted('gliding club');
        actions.pickUnhighlighted();

        unlisten = picks.listen(function (store) {
            expect(store.highlighted).to.equal(undefined);
            done();
        });
    });
});