var React = require('react');
var TestUtils = require('react/addons').addons.TestUtils;

function setUpComponent(distance, ascending, descending) {
    var PieChartFactory = require('inject!../../../../app/components/stats/piechart');
    var PieChart = PieChartFactory({
        'react-chartjs': {
            Pie: new React.createClass({
                render() {
                    return (<div>hello</div>)
                }
            })
        }
    });

    var componentUnderTest = TestUtils.renderIntoDocument(<PieChart ascending={ascending} descending={descending} distance={distance}/>);
    var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, PieChart).getDOMNode();

    return dom;
}

describe('stats component', function () {
    it('should update overall distance', function (done) {
        var dom = setUpComponent({
            value: 92.0
        }, 10, 12);

        setTimeout(() => {
            dom.getElementsByTagName('span')[3].innerHTML.should.equal('92');
            done();
        }, 1000);
    });

    it('should update overall ascending', function (done) {
        var dom = setUpComponent(92.0, 10, 12);

        setTimeout(() => {
            dom.getElementsByClassName('desc')[0].getElementsByTagName('span')[0].innerHTML.should.equal('12');
            done();
        }, 1000);
    });

    it('should update overall descending', function (done) {
        var dom = setUpComponent(92.0, 10, 12);
        setTimeout(() => {
            dom.getElementsByClassName('asc')[0].getElementsByTagName('span')[0].innerHTML.should.equal('10');
            done();
        }, 1000);
    });
});