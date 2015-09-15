var React = require('react');
var Route = require('../route');

module.exports = React.createClass({
    render: function () {
        var that = this;
        var legs = this.props.legs.map( (leg, i) => <Route key={i} route={leg.polyline} map={that.props.map}/>);
        return <div>{legs}</div>;
    }
});
