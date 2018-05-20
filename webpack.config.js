module.exports = {
    entry: {
        page1: './Demo/Test/app.js',
        dcAnt: './Lib/index.js'
    },
    output: {
        filename: "[name].bound.js",
        path: __dirname + '/bound/',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|svg|gif|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        compress: true,
        port: 8099,
        inline: true,
        publicPath: '/',
    },
}