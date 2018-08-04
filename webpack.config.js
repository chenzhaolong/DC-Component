/**
 * @file webpack配置文件
 */

const baseWebpack = require('./build/webpack.base');
const webpack = require('webpack');
const merge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let file = require('./build/component.json');

let _entry = file.readLocation(__dirname + '/src/components/');

module.exports = merge(baseWebpack, {
    entry: {
        ..._entry
    },

    output: {
        filename: '[name].min.js',
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                'drop_console': true
            }
        }),

        new ExtractTextPlugin('styles.css')
    ]
});
