var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai'],
        reporters: ['dots'],
        files: [
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyBqHMoN6nB_EgKgG0rZ9LjC5dNu2UV34KY&libraries=geometry',
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
        },
        port: 9876,
        colors: true,
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        webpack: { //kind of a copy of your webpack config
            devtool: 'inline-source-map', //just do inline source maps instead of the default
            module: {
                loaders: [
                    {test: /\.js$/, loader: 'babel-loader'},
                    {
                        test: /\.jsx?$/,
                        exclude: /(node_modules)/,
                        loader: 'babel'
                    }, {
                        test: /\.scss$/,
                        loader:
                            // activate source maps via loader query
                            'css?sourceMap!' +
                            'sass?sourceMap&' +
                            'includePaths[]=' +
                            './app/components/main/sass-globals'
                    }, {
                        test: /\.(woff([\?]?.*)$|woff2([\?]?.*)$|eot([\?]?.*)$|ttf([\?]?.*)$|svg([\?]?.*)$)$/,
                        loader: 'url-loader?limit=100000'
                    }
                ]
            }
        },
        webpackServer: {
            noInfo: true //please don't spam the console when running in karma!
        }

    })
};
