var React = require('react');
var Reflux = require('reflux');
var TestUtils = require('react/addons').addons.TestUtils;

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
    var PieChartFactory = require('inject!../../../../app/components/stats/piechart');
    var PieChart = PieChartFactory({
        '../../../stores/route': fakeRouteStore,
        '../../../stores/elevations': fakeElevationsStore,
        'react-chartjs': {
            Pie: new React.createClass({
                render() {
                    return (<div>hello</div>)
                }
            })
        }
    });

    var componentUnderTest = TestUtils.renderIntoDocument(<PieChart/>);
    var dom = TestUtils.findRenderedComponentWithType(componentUnderTest, PieChart).getDOMNode();

    fakeRouteStore.updateNumber();
    fakeElevationsStore.updateNumber();
    return dom;
}
describe('stats component', function () {
    it('should render as zero initially', function () {
        var dom = setUpComponent();

        dom.getElementsByTagName('span')[0].innerHTML.should.equal('0');
    });

    it('should update overall distance, converting to km when store is updated', function (done) {
        var dom = setUpComponent();

        setTimeout(() => {
            dom.getElementsByTagName('span')[3].innerHTML.should.equal('92.0');
            done();
        }, 1000);
    });

    it('should update overall ascending when store is updated', function (done) {
        var dom = setUpComponent();

        setTimeout(() => {
            dom.getElementsByClassName('desc')[0].getElementsByTagName('span')[0].innerHTML.should.equal('12');
            done();
        }, 1000);
    });

    it('should update overall descending when store is updated', function (done) {
        var dom = setUpComponent();
        setTimeout(() => {
            dom.getElementsByClassName('asc')[0].getElementsByTagName('span')[0].innerHTML.should.equal('10');
            done();
        }, 1000);
    });
});