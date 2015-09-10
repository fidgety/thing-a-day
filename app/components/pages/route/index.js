require('./style.scss');

var React = require('react');

var Map = require('../../map/index');
var PicksDetail = require('../../picks/picksDetail/index');
var Stats = require('../../stats/index');
var actions = require('../../../actions/map');

module.exports = React.createClass({
    componentDidMount() {
        actions.load(this.props.params.name);
    },
    render: function () {
        return (
            <div id="route"><PicksDetail/><Map/><Stats/></div>
        );
    }
});