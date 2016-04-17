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
            { test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    },
    devtool: 'source-map'
}