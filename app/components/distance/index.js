require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var routeStore = require('../../stores/route');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(routeStore, 'onRouteChange')
    ],
    getInitialState: function () {
        return {
            distance: 0
        };
    },
    onRouteChange(route) {
        updateNumber(this.state.distance, (route.distance / 1000).toFixed(2), this);
    },
    render: function () {
        return <div id="distance">{this.state.distance}km</div>
    }
});

function updateNumber(oldNumber, newNumber, that) {
    //var initialClassName = element.className;
    //element.className += ' ticker-animation';

    newNumber = parseFloat(newNumber);

    var framesPerSecond = 30;
    var millisecondsPerFrame = 1000 / framesPerSecond;
    var currentNumber = parseFloat(oldNumber);
    var difference = newNumber - currentNumber;
    var numberPerFrame = difference / framesPerSecond;
    var currentFrame = 1;

    var increment = function() {
        currentNumber += numberPerFrame;

        if (++currentFrame === framesPerSecond) {
            //element.className = initialClassName;
            currentNumber = newNumber;
        }

        that.setState({
            distance: currentNumber.toFixed(2)
        });
    };

    for (var i = 0; i < framesPerSecond; i++) {
        setTimeout(increment, millisecondsPerFrame * i);
    }
}
