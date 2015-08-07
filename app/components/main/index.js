var React = require('react');
require('./reset.scss');
require('./style.scss');

var Main = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {},
    render: function () {
        return (
            <div>Things</div>
        );
    }
});

React.render(<Main/>, document.getElementById('app'));