var React = require('react');
require('./reset.scss');
require('./style.scss');
require('./fonts/icon-font.scss');

var Plan = require('../pages/plan');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;
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
        <Redirect from="/" to="plan" />
        <Route name="plan" path="/plan" handler={Plan}/>
        <Route name="overview" path="/route/:name" handler={RouteOverview}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, document.body);
});