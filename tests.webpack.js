require('core-js/es5');
//http://kentor.me/posts/testing-react-and-flux-applications-with-karma-and-webpack/

var context = require.context('./tests', true, /.*js/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);