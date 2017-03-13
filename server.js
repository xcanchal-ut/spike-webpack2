const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const compiler = webpack(config);
const WebpackDevServer = require('webpack-dev-server'); // express based server

const PORT = process.env.WEBPACK_PORT || 3333;

const server = new WebpackDevServer(compiler, {

    // Path to the content directory, can also be an array
    contentBase: __dirname,

    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
    // Also need to add the following lines to the config "entry"
    //    'webpack/hot/dev-server',
    //    'webpack-dev-server/client?http://localhost:6969',
    hot: false,

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    // Set this if you want to enable gzip compression for assets
    compress: true,

    // Print building status in different colors to easier visual diff
    stats: {
        colors: true,
    },

    setup(app) {
        // Here you can access the Express app object and add your own custom middleware to it.
    },

    // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
    staticOptions: {},

    /* Control the console log messages shown in the browser when using inline mode. Can be `error`,
    `warning`, `info` or `none`. */
    clientLogLevel: 'info',

    // webpack-dev-middleware options
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },

    /* https: {
     cert: fs.readFileSync("path-to-cert-file.pem"),
     key: fs.readFileSync("path-to-key-file.pem"),
     cacert: fs.readFileSync("path-to-cacert-file.pem")
     } */
});

server.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info(
            '==> Listening on PORT %s. Open up http://localhost:%s/ in your browser.', PORT, PORT
        );
    }
});