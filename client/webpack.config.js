module.exports = {
    entry:  "./main.js",
    output: {
        path:       "./public/static/build/",
        filename:   "bandle.js",
        publicPath: "static/build"
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'raw' },
            { test: /\.css$/, loader: 'style-loader!css-loader'},
            { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=/fonts/[name].[ext]' }
        ]
    },
    devtool: 'source-map'
}