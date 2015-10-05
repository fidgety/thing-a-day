require('./style.scss');

var React = require('react');
var Reflux = require('reflux');

var actions = require('../../../actions/map');

var routeStore = require('../../../stores/route');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(routeStore, 'onRouteChange')
    ],
    getInitialState: function () {
        return {
            routeStarted: false,
            name: name
        };
    },
    onRouteChange: function (route) {
        this.setState({
            name: route.name,
            routeStarted: route.startingLatLng
        });
    },
    render: function () {
        var activeClass = this.state.routeStarted ? 'save-button save-active' : 'save-button';

        var toggleDialog = function (e) {
            document.getElementsByClassName('saveDialog')[0].classList.toggle('saveDialog-show');
            e && e.stopPropagation();
        };

        var save = function () {
            var name = document.getElementsByName('save-name')[0].value;
            var description = document.getElementsByName('save-description')[0].value;
            actions.updateRouteDetails({
                name,
                description
            });
            actions.save();
            toggleDialog();
        };

        return (
            <div id="save">
                <div className={activeClass} onClick={toggleDialog}>save</div>
                <div className="saveDialog">
                    <input className="name" name="save-name" type="text" userprompt="name"/>
                    <textarea name="save-description" defaultValue="description"></textarea>
                    <div className="save" onClick={save}>save</div>
                    <div className="cancel" onClick={toggleDialog}>cancel</div>
                </div>
            </div>
        );
    }
});