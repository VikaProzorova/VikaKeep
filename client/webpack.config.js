module.exports = {
    entry:  "./main.js",
    devtool: "source-map",
    output: {
        path:       "./public/static/build/",
        filename:   "bandle.js",
        publicPath: "static/build"
    },
    resolve: {
        moduleDirectories: ['.', 'node_modules'],
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: "raw" },
            { test: /\.css$/, loader: "style-loader!css-loader"},
            { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: "file-loader?name=/fonts/[name].[ext]" }
        ]
    },
    devServer: {
        contentBase: "public",
        port: 8000,
        hot: true,
        historyApiFallback: true,
        compress: true,
        proxy: {
            '/api/*': { target: 'http://localhost:3000/' }
        },
    }
};