const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// project source directory
const SRC_DIR = path.join(__dirname, 'src');
const STATICS_DIR = path.join(__dirname, 'statics');

// Build paths
const BUILD_FILES_PATH = path.join(__dirname, 'build');
const BUILD_PUBLIC_PATH = '/';


module.exports = {

    devtool: 'inline-source-map',

    // application entry point
    entry: `${SRC_DIR}/index.js`,

    // output configuration
    output: {
        path: BUILD_FILES_PATH,
        publicPath: BUILD_PUBLIC_PATH,
        filename: 'bundle.js',
    },

    // extract css in separate file
    plugins: [
        new ExtractTextPlugin('styles.css'),
    ],

    module: {
        // loaders
        rules: [
            // javascript
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [SRC_DIR],
                exclude: [STATICS_DIR],
            },
            // styles
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader?sourceMap',
                        'postcss-loader?sourceMap',
                        'resolve-url-loader',
                        'sass-loader?sourceMap',
                    ],
                    fallback: 'style-loader?sourceMap',
                }),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader?sourceMap', 
                        'postcss-loader?sourceMap',
                    ],
                    fallback: 'style-loader?sourceMap',
                }),
            },
            // images
            {
                test: /\.(ico|jpe?g|png|gif)$/,
                use: 'url-loader?limit=1000000&mimetype=image',
            },
        ],
    },
};
