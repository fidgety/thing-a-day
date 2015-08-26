var React = require('react');
var Reflux = require('reflux');
var TestUtils = require('react/addons').addons.TestUtils;
var Stats = require('../../../app/components/stats');

function setUpComponent() {
    var fakeRouteStore = Reflux.createStore({
        updateNumber: function () {
            this.trigger({
                distance: 92000
            });
        }
    });

    var fakeElevationsStore = Reflux.createStore({
        updateNumber: function () {
            this.trigger({
                ascending: 10,
                descending: 12.2
            });
        }
    });
    var StatsFactory = require('inject!../../../app/components/stats');
    var Stats = StatsFactory({
        '../../stores/route': fakeRouteStore,
        '../../stores/elevations': fakeElevationsStore
    });

    var componentUnderTest = TestUtils.renderIntoDocument(<Stats/>);
    var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Stats).getDOMNode();

    fakeRouteStore.updateNumber();
    fakeElevationsStore.updateNumber();
    return dom;
}
describe('stats component', function () {
    it('should render as zero initially', function () {
        var componentUnderTest = TestUtils.renderIntoDocument(<Stats/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Stats).getDOMNode();

        dom.getElementsByTagName('span')[0].innerHTML.should.equal('0');
    });

    it('should update overall distance, converting to km when store is updated', function (done) {
        var dom = setUpComponent();

        setTimeout( () => {
            dom.getElementsByTagName('span')[0].innerHTML.should.equal('92.00');
            done();
        }, 1000);
    });

    it('should update overall ascending when store is updated', function (done) {
        var dom = setUpComponent();

        setTimeout( () => {
            dom.getElementsByTagName('span')[2].innerHTML.should.equal('10.00');
            done();
        }, 1000);
    });

    it('should update overall descending when store is updated', function (done) {
        var dom = setUpComponent();
        setTimeout( () => {
            dom.getElementsByTagName('span')[4].innerHTML.should.equal('12.20');
            done();
        }, 1000);
    });
});