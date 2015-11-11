require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var picksActions = require('../../../actions/picks');
var PicksStats = require('../picksStats');

var picksStore = require('../../../stores/picks');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(picksStore, 'onPicksChange')
    ],
    getInitialState: function () {
        return {
            highlighted: false,
            highlightedItem: {
                img: [],
                stats: {}
            }
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
        var pick = this.state.highlightedItem;
        var activeClass = this.state.highlighted ? 'picks-active' : 'picks-inactive';
        activeClass += ' ' + pick.type;
        var close = function () {
            picksActions.pickUnhighlighted(pick.name);
        };

        var add = function () {
            picksActions.pickSelected(pick);
        };

        if (!pick.img) {
            pick.img = [];
        }
        
        return (
            <div id="picks" className={activeClass}>
                <div className="outer">
                    <div className="hero">
                        <img src={pick.img[0]}/>
                        <div className="inner">
                            <div className="title">{pick.name}</div>
                            <div className="type">{pick.type}</div>
                            <PicksStats stats={pick.stats}/>
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
