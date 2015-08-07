var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './app/components/main/index.js',
    output: {
        filename: './public/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
    // activate source maps via loader query
    'css?sourceMap!' +
    'sass?sourceMap&' +
            'includePaths[]=' +
            './app/components/main/sass-globals')
        }]
    },
    plugins: [
        new ExtractTextPlugin("./public/styles.css")
    ]
};
