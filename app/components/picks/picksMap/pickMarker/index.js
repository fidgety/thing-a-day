function makeToolTip(onAdd, onClose) {
    var tooltipDiv = document.createElement('div');
    var addDiv = document.createElement('div');
    var closeDiv = document.createElement('div');

    addDiv.innerHTML = '+';
    addDiv.className = 'picks-add';
    addDiv.onclick = function () {
        onAdd();
        return false;
    };
    tooltipDiv.appendChild(addDiv);

    closeDiv.innerHTML = '-';
    closeDiv.className = 'picks-close';
    closeDiv.onclick = function () {
        onClose();
        return false;
    };
    tooltipDiv.appendChild(addDiv);
    tooltipDiv.appendChild(closeDiv);

    return tooltipDiv;
}

var React = require('react');

var Marker = require('../../../marker');

module.exports = React.createClass({
    render() {
        var tooltipDiv = makeToolTip(this.props.onAdd, this.props.onClose);

        return <Marker key={this.props.name + this.props.map} latLng={this.props.latLng} map={this.props.map} classPrefix={this.props.type} tooltopDiv={tooltipDiv} highlighted={this.props.highlighted} onclick={this.props.onclick}/>
    }
});

