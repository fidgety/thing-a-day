var React = require('react');
var TestUtils = require('react/addons').addons.TestUtils;
var Ticker = require('../../../app/components/ticker');

describe('ticker component', function () {
    it('should render initial value', function () {
        var componentUnderTest = TestUtils.renderIntoDocument(<Ticker value="1" animate={false}/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Ticker).getDOMNode();

        dom.getElementsByTagName('span')[0].innerHTML.should.equal('1');
    });

    it('should render label', function () {
        var componentUnderTest = TestUtils.renderIntoDocument(<Ticker value="1" label="test label" animate={false}/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Ticker).getDOMNode();

        dom.getElementsByTagName('span')[1].innerHTML.should.equal('test label');
    });

    it('should default label to empty string if not specified', function () {
        var componentUnderTest = TestUtils.renderIntoDocument(<Ticker value="1" animate={false}/>);
        var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, Ticker).getDOMNode();

        dom.getElementsByTagName('span')[1].innerHTML.should.equal('');
    });
});