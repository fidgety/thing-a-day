var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value,
            class: '',
            label: this.props.label || ''
        };
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.animate) {
            updateNumber(this.state.value, nextProps.value, this);
        }
        else {
            this.setState({
                value: nextProps.value
            })
        }
    },
    render: function () {
        return <div id={this.props.name} className={this.state.class}>
            {this.state.value}<span className="label">{this.state.label}</span>
        </div>
    }
});

function updateNumber(oldNumber, newNumber, that) {
    that.setState({
        class: 'ticker-animation'
    });

    newNumber = parseFloat(newNumber);

    var framesPerSecond = 20;
    var millisecondsPerFrame = 1000 / framesPerSecond;
    var currentNumber = parseFloat(oldNumber);
    var difference = newNumber - currentNumber;
    var numberPerFrame = difference / framesPerSecond;
    var currentFrame = 0;

    var increment = function () {
        currentNumber += numberPerFrame;

        if (++currentFrame === framesPerSecond) {
            that.setState({
                class: ''
            });
            currentNumber = newNumber;
        }

        that.setState({
            value: currentNumber.toFixed(2)
        });
    };

    for (var i = 0; i < framesPerSecond; i++) {
        setTimeout(increment, millisecondsPerFrame * i);
    }
}
