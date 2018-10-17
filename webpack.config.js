const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    stats: 'errors-only',
    entry: './lib/js/src/App.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '__project_name__',
            template: path.join(__dirname, '/public/template.html'),
            filename: path.join(__dirname + '/dist/index.html'),
            meta: {
                // Will generate: <meta http-equiv="Content-Security-Policy" content="default-src https:">
                // Which equals to the following http header: `Content-Security-Policy: default-src https:`
                'set-cookie': {
                    'http-equiv': 'set-cookie',
                    content: 'name=value; expires=date; path=url',
                },
                // Will generate: <meta http-equiv="set-cookie" content="value; expires=date; path=url">
                // Which equals to the following http header: `set-cookie: value; expires=date; path=url`
            },
            cache: true,
            minify: true,
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        stats: 'errors-only',
        compress: true,
        port: 9000,
        stats: {
            modules: false,
        },
    },
};
