var React = require('react');
var Reflux = require('reflux');
var TestUtils = require('react/addons').addons.TestUtils;
var Distance = require('../../../app/components/distance');

describe('distance component', function () {
    it('should render as zero initially', function () {
        var componentUnderTest = TestUtils.renderIntoDocument(<Distance/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Distance).getDOMNode();

        dom.getElementsByTagName('span')[0].innerHTML.should.equal('0');
    });

    it('should render a new value after a second when the store is updated', function (done) {
        var fakeStore = Reflux.createStore({
            updateNumber: function () {
                this.trigger({
                    distance: 92
                });
            }
        });

        var DistanceFactory = require('proxy!../../../app/components/distance');
        var Distance = DistanceFactory({
            '../../stores/route': fakeStore
        });

        var componentUnderTest = TestUtils.renderIntoDocument(<Distance/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Distance).getDOMNode();

        fakeStore.updateNumber();

        setTimeout(() => {
            dom.getElementsByTagName('span')[0].innerHTML.should.not.equal('0');
            done();
        }, 100);

    });
});