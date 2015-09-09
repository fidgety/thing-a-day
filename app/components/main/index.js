var React = require('react');
require('./reset.scss');
require('./style.scss');
require('./fonts/icon-font.scss');

var Plan = require('./plan');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Main = React.createClass({
    render: function () {
        return (
            <div id="main"><RouteHandler/></div>
        );
    }
});

var Hello = React.createClass({
    render() {
        return <div>hello {this.props.params.name}</div>
    }
});

// declare our routes and their hierarchy
var routes = (
    <Route handler={Main}>
        <Route path="/plan" handler={Plan}/>
        <Route path="/route/:name" handler={Hello}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
    React.render(<Root/>, document.body);
});