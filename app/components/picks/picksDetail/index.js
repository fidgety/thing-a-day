require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

//var actions = require('../../../actions/map');

var picksStore = require('../../../stores/picks');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(picksStore, 'onPicksChange')
    ],
    getInitialState: function () {
        return {
            highlighted: undefined
        };
    },
    onPicksChange: function (updatedPicksStore) {
        this.setState({
            highlighted: updatedPicksStore.highlighted
        });
    },
    render: function () {
        var activeClass = this.state.highlighted ? 'picks-active' : '';
        var pick = this.state.highlighted || {};
        return (
            <div id="picks" className={activeClass}>
                <div className="outer">
                    <ul className="inner">
                        <li>
                            <h4>{pick.type}</h4>
                            <h3>{pick.name}</h3>
                            <img src={pick.img}/>
                            <div className="info">
                                <div className="distance">{pick.distance}</div>
                                <div className="ascending">{pick.elevation}</div>
                            </div>
                            {pick.description}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});