/**
 * @file 开发环境下的webpack配置
 */
const baseWebpack = require('./build/webpack.base');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = merge(baseWebpack, {
    entry: {
        demo: './test/Demo/app.js'
    },

    output: {
        filename: '[name].js'
    },


    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        hot: true,
        contentBase: path.join(__dirname, './'),
        publicPath: '/output/',
        port: 8100,
        inline: true,
        before(app) {
            app.get('./*', function (req, res) {
                const templatePath = path.join(__dirname, './index.demo.html');
                fs.readFile(templatePath, {'encoding': 'UTF-8'}, function (err, html) {
                    res.send(html);
                });
            })
        }
    },

    resolveLoader: {
        modules: [
            'node_modules'
        ]
    },

    devtool: 'inline-source-map'
});