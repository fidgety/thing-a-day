var context = require.context('./tests', true, /.*js/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);