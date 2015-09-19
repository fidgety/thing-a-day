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
            actions.mapClicked(pick.latLng);
            close();
        };
        
        return (
            <div id="picks" className={activeClass}>
                <div className="outer">
                    <div className="hero">
                        <img src={pick.img}/>
                        <div className="inner">
                            <div className="title">Cutlery Factory</div>
                            <div className="type">café</div>
                            <div className="stats">
                                <div className="elevation"><span className="number">£££</span><span className="unit">price</span></div>
                                <div className="distance"><span className="number">****</span><span className="unit">quality</span></div>
                            </div>
                        </div>
                        <div className="add-button button" onClick={add}>+</div>
                        <div className="close-button button" onClick={close}>-</div>
                    </div>

                    <div className="description">
                    David Mellor was an industrial designer, you may not have heard of him but if you visit this beautiful complex
                    you'll see many examples of everyday objects he crafted. He built this complex to make high end cutlery, which
                    they still do to this day. The cafe has ample seating inside and out and is a wonderful little oasis of culture.
                    There is a good selection of cakes and food, and the staff couldn't be nicer.
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