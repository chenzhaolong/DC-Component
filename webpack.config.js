/**
 * @file webpack配置文件
 */

const baseWebpack = require('./build/webpack.base');
const webpack = require('webpack');
const merge = require('webpack-merge');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseWebpack, {
    entry: {
        index: './src/components/index.js'
    },

    output: {
        filename: 'index.min.js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
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
