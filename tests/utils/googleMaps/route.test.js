var route = require('../../../app/utils/googleMaps/route');

describe('google maps route utilities', function () {
    describe('gracefully handle missing data', function () {
        it('should handle undefined', function () {
            expect(route.routeToLatLngs(undefined)).to.be.undefined;
        });

        it('should handle no steps', function () {
            expect(route.routeToLatLngs([{
                legs: undefined
            }])).to.be.undefined;
        });

        it('should handle no lat_lngs', function () {
            expect(route.routeToLatLngs([{
                legs: {
                    steps: undefined
                }
            }])).to.be.undefined;
        });
    });

    it('should flatten all lat lngs in a step', function () {
        var fakeRoute = {
            legs: [{
                steps: [{
                    lat_lngs: ['a', 'b']
                }]
            }]
        };

        route.routeToLatLngs(fakeRoute).should.deep.equal(['a', 'b']);
    });

    it('should flatten all lat lngs in each step', function () {
        var fakeRoute = {
            legs: [{
                steps: [{
                    lat_lngs: ['a', 'b']
                },{
                    lat_lngs: ['c', 'd']
                }]
            }]
        };

        route.routeToLatLngs(fakeRoute).should.deep.equal(['a', 'b', 'c', 'd']);
    });

    it('should flatten all lat lngs in each leg', function () {
        var fakeRoute = {
            legs: [{
                steps: [{
                    lat_lngs: ['a', 'b']
                }]
            },{
                steps: [{
                    lat_lngs: ['c', 'd']
                }]
            }]
        };

        route.routeToLatLngs(fakeRoute).should.deep.equal(['a', 'b', 'c', 'd']);
    });
});
