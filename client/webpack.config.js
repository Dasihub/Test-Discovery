const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.tsx')],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
    },
    target: 'web',
    devtool: 'source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    performance: {
        hints: false,
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new CleanWebpackPlugin(),
        new ESLintWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss|sass)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(pdf|png|jpg|jpeg)$/,
                use: ['file-loader'],
            },
        ],
    },
};
