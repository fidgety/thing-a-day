var React = require('react');
var Reflux = require('reflux');
var TestUtils = require('react/addons').addons.TestUtils;

var fakeWaypointsStore;

function setUpComponent() {
    fakeWaypointsStore = Reflux.createStore({
        updateStore: function (newVal) {
            this.trigger(newVal);
        }
    });

    var undoFactory = require('inject!../../../app/components/growler');
    var Help = undoFactory({
        '../../stores/waypoints': fakeWaypointsStore
    });

    var componentUnderTest = TestUtils.renderIntoDocument(<Help/>);
    return TestUtils.findRenderedComponentWithType(componentUnderTest, Help).getDOMNode();
}

describe('help component', function () {
    it('should let the user know what to do when there are no waypoints', function () {
        var dom = setUpComponent();

        dom.innerText.should.contain('Click anywhere on the map to start a route');
    });

    it('should prompt the user to save when they have chosen three waypoints', function () {
        var dom = setUpComponent();
        fakeWaypointsStore.updateStore([1]);

        dom.innerText.should.contain('Now click somewhere else and let us find a route there');
    });

});