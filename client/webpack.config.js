const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const entry = __dirname + '/src/index.js';
const pathOutput = __dirname + '/dist/';

module.exports = {
    mode: 'development',
    entry: entry,
    output: {
        publicPath: '/',
        path: pathOutput,
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        watchContentBase: true,
        progress: true,
        compress: true,
        hot: true,
        inline: true,
        overlay: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
  };