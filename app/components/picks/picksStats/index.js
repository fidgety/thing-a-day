var React = require('react');

function makeString(count, char) {
    var _value = '';
    for (let i = 0; i < count; i++) {
        _value += char;
    }
    return _value;
}

function renderStatValue(stat, value) {
    if (stat === 'price') {
        return makeString(value, '£');
    }
    if (stat === 'quality') {
        return makeString(value, '*');
    }
    return value;
}

module.exports = React.createClass({
    render: function () {
        return (
            <div className="stats">
                {Object.keys(this.props.stats).map(statName => {
                    return <div key={statName} className="item">
                        <span className="number">{renderStatValue(statName, this.props.stats[statName])}</span>
                        <span className="unit">{statName}</span>
                    </div>;
                })}
            </div>
        );
    }
});
