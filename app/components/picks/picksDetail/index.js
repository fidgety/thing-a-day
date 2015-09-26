require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');

var picksStore = require('../../../stores/picks');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(picksStore, 'onPicksChange')
    ],
    getInitialState: function () {
        return {
            highlighted: false,
            highlightedItem: {}
        };
    },
    onPicksChange: function (updatedPicksStore) {
        this.setState({
            highlighted: updatedPicksStore.highlighted,
            highlightedItem: updatedPicksStore.highlighted || this.state.highlightedItem
        });
    },
    componentDidUpdate() {
        this._setHeightOfDescription();
    },
    componentDidMount() {
        this._setHeightOfDescription();
    },
    _setHeightOfDescription() {
        var descriptionTop = document.querySelector('#picks .description').getBoundingClientRect().top;
        var picksHeight = document.querySelector('#picks').getBoundingClientRect().height;
        document.querySelector('#picks .description').setAttribute('style','height:' + (picksHeight - descriptionTop + 22) + 'px');
    },
    render: function () {
        var activeClass = this.state.highlighted ? 'picks-active' : 'picks-inactive';
        var pick = this.state.highlightedItem;
        var close = function () {
            actions.pickUnhighlighted(pick.name);
        };

        var add = function () {
            if (pick.type = 'climb') {
                actions.routeSelected(pick.route);
                return close();
            }
            actions.mapClicked(pick.latLng);
            close();
        };
        
        return (
            <div id="picks" className={activeClass}>
                <div className="outer">
                    <div className="hero">
                        <img src={pick.img}/>
                        <div className="inner">
                            <div className="title">{pick.name}</div>
                            <div className="type">{pick.type}</div>
                            <div className="stats">
                                <div className="elevation"><span className="number">£££</span><span className="unit">price</span></div>
                                <div className="distance"><span className="number">****</span><span className="unit">quality</span></div>
                            </div>
                        </div>
                        <div className="add-button button" onClick={add}>+</div>
                        <div className="close-button button" onClick={close}>-</div>
                    </div>

                    <div className="description">
                    {pick.description}
                    </div>
                </div>


            </div>
        );
    }
});

//<div className="outer">
//    <ul className="inner">
//        <li>
//            <h4></h4>
//            <h3>{pick.name}</h3>
//            <img src={pick.img}/>
//            <div className="info">
//                <div className="distance">{pick.distance}</div>
//                <div className="ascending">{pick.elevation}</div>
//            </div>
//            {pick.description}
//        </li>
//    </ul>
//</div>