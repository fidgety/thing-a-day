var React = require('react');
var Reflux = require('reflux');
var TestUtils = require('react/addons').addons.TestUtils;

var fakeRouteStore;

function setUpComponent() {
    fakeRouteStore = Reflux.createStore({
        updateStore: function (newVal) {
            this.trigger(newVal);
        }
    });

    var undoFactory = require('inject!../../../../app/components/userPrompts/undo');
    var Undo = undoFactory({
        '../../../stores/route': fakeRouteStore
    });

    var componentUnderTest = TestUtils.renderIntoDocument(<Undo/>);
    return TestUtils.findRenderedComponentWithType(componentUnderTest, Undo).getDOMNode();
}

describe('undo component', function () {
    it('should not be visible when there are no waypoints', function () {
        var dom = setUpComponent();

        dom.className.should.not.contain('undo-active');
    });

    it('should be visible when there is a waypoint', function () {
        var dom = setUpComponent();

        fakeRouteStore.updateStore({
            startingLatLng: 'something'
        });

        dom.className.should.contain('undo-active');
    });

    it('should be not visible when waypoints is back to zero', function () {
        var dom = setUpComponent();

        fakeRouteStore.updateStore({
            startingLatLng: 'something'
        });
        dom.className.should.contain('undo-active');

        fakeRouteStore.updateStore({
            startingLatLng: undefined
        });
        dom.className.should.not.contain('undo-active');
    });
});