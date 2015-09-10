var React = require('react');
require('./reset.scss');
require('./style.scss');
require('./fonts/icon-font.scss');

var Plan = require('../pages/plan');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var RouteOverview = require('../pages/route');

var Main = React.createClass({
    render: function () {
        return (
            <div id="main"><RouteHandler/></div>
        );
    }
});

var routes = (
    <Route handler={Main}>
        <Route path="/plan" handler={Plan}/>
        <Route path="/route/:name" handler={RouteOverview}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, document.body);
});