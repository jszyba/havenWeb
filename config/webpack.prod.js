const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');

const ENV = process.env.ENV = 'production';

module.exports = {

    devtool: 'source-map',

    output: {
        path: helpers.root('server', 'public'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },

    entry: {
        'vendor': './client/src/vendor.js',
        'app': './client/src/root.js'
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader']

            },
            {
                test: /\.(pug|jade)$/,
                loader: 'pug-html-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: "[name].[hash].css",
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'client/src/index.html',
            title: 'Bee Haven Buzz'
        }),
        new CopyWebpackPlugin([
            { from: helpers.root('favicon.ico'), to: helpers.root('server', 'public') }
        ])
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};


