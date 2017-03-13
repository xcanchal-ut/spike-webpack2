const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Source files
const SRC_DIR = path.join(__dirname, 'src');
const STATICS_DIR = path.join(__dirname, 'statics');

// Build
const BUILD_FILES_PATH = path.join(__dirname, 'build');
const BUILD_PUBLIC_PATH = '/';


module.exports = {

    devtool: 'source-map',

    entry: `${SRC_DIR}/index.js`,

    output: {
        path: BUILD_FILES_PATH,
        publicPath: BUILD_PUBLIC_PATH,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
    },

    plugins: [
        new ExtractTextPlugin('[name].[contenthash].css'),
        // Separate vendor files from app files
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            minChunks: ({ context }) => context && context.indexOf('node_modules') !== -1,
        }),
        // Minify and optimize the index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index_prod.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        }),
        new CopyWebpackPlugin([{ 
            from: STATICS_DIR, 
            to: `${BUILD_FILES_PATH}/statics/`,
        }]),
    ],

    module: {

        rules: [
            // javascript
            {
                test: /\.js$/,
                use: ['babel-loader'],
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
                        'resolve-url-loader?sourceMap',
                        'sass-loader?sourceMap',
                    ],
                    fallback: 'style-loader?sourceMap',
                }),
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?sourceMap', 'postcss-loader?sourceMap'],
                    fallback: 'style-loader?sourceMap',
                }),
            },
            // images
            {
                test: /\.(ico|jpe?g|png|gif)$/,
                use: 'url-loader?limit=1000000&mimetype=image',
            },
            // fonts
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=application/font-woff',
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=application/octet-stream',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: 'file-loader',
            },
            // svg
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: 'url-loader?limit=100000&mimetype=image/svg+xml',
            },
        ],
    },
};