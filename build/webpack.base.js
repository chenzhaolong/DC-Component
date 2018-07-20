/**
 * @file webpack基本配置
 */
let path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, '../output/'),
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },

            {
                test: /\.(png|jpg|svg|gif|ttf|woff|woff2)$/,
                loader: 'url-loader'
            }
        ]
    }
};