var React = require('react');
var Reflux = require('reflux');
var TestUtils = require('react/addons').addons.TestUtils;
var Stats = require('../../../app/components/stats');

describe('stats component', function () {
    it('should render as zero initially', function () {
        var componentUnderTest = TestUtils.renderIntoDocument(<Stats/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Stats).getDOMNode();

        dom.getElementsByTagName('span')[0].innerHTML.should.equal('0');
    });

    it('should update number and convert to km when store is updated', function (done) {
        var fakeStore = Reflux.createStore({
            updateNumber: function () {
                this.trigger({
                    distance: 92000
                });
            }
        });

        // https://www.npmjs.com/package/proxy-loader
        var StatsFactory = require('proxy!../../../app/components/stats');
        var Stats = StatsFactory({
            '../../stores/route': fakeStore
        });

        var componentUnderTest = TestUtils.renderIntoDocument(<Stats/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Stats).getDOMNode();

        fakeStore.updateNumber();

        setTimeout( () => {
            dom.getElementsByTagName('span')[0].innerHTML.should.equal('92.00');
            done();
        }, 1000);
    });
});