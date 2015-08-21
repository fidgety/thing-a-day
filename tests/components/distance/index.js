var React = require('react');
var TestUtils = require('react/addons').addons.TestUtils;
var Distance = require('../../../app/components/distance');

describe('distance component', function () {
    it('should render as zero initially', function () {
        var componentUnderTest = TestUtils.renderIntoDocument(<Distance/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Distance).getDOMNode();

        dom.getElementsByTagName('span')[0].innerHTML.should.equal('0');
    });

    it('should render a new value after a second when the store is updated', function () {
        var componentUnderTest = TestUtils.renderIntoDocument(<Distance/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Distance).getDOMNode();

        dom.getElementsByTagName('span')[0].innerHTML.should.equal('0');
    });
});