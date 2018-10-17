const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: devMode ? 'development' : 'production',
    stats: 'errors-only',

    entry: {
        main: path.join(__dirname, '/src/App.bs.js'),
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: devMode ? '[name].js' : '[name].[hash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
        }),
        new HtmlWebpackPlugin({
            title: '__project_name__',
            template: path.join(__dirname, '/public/template.html'),
            filename: path.join(__dirname + '/dist/index.html'),
            meta: {
                // Will generate: <meta http-equiv="set-cookie" content="value; expires=date; path=url">
                // Which equals to the following http header: `set-cookie: value; expires=date; path=url`
                'set-cookie': {
                    'http-equiv': 'set-cookie',
                    content: 'name=value; expires=date; path=url',
                },
            },
            cache: true,
            minify: true,
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        // It suppress error shown in console, so it has to be set to false.
        quiet: false,
        // It suppress everything except error, so it has to be set to false as well
        // to see success build.
        noInfo: false,
        stats: {
            // Config for minimal console.log mess.
            entrypoints: false,
            modules: false,
            buildAt: false,
            module: false,
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
        },
    },
};
