const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const development = 'development';

module.exports = (env, options) => {
    const {mode = development} = options;

    const config = {
        entry: {
            index: './src/client/src'
        },
        mode,
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    test: /\.js$/
                },
                {
                    loaders: [
                        MiniCSSExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                localIdentName: '[local][name]-[hash:base64:5]',
                                minimize: true,
                                modules: true
                            }
                        }
                    ],
                    test: /\.s?[ac]ss$/
                },
                {
                    loader: 'file-loader',
                    options: {name: 'assets/images/[name].[ext]'},
                    test: /\.(png|jpe?g|gif)/
                },
                {
                    include: /src/,
                    loader: 'file-loader',
                    options: {name: '[name].[ext]'},
                    test: /(manifest\.json|worker\.js)$/,
                    type: 'javascript/auto'
                }
            ]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'all',
                        name: 'vendor',
                        priority: -1,
                        test: /node_modules/
                    },
                    default: false
                }
            }
        },
        output: {
            chunkFilename: '[name].[chunkhash:8].js',
            filename: '[name].[hash:8].js',
            path: path.resolve(__dirname, 'src', 'client', 'dist'),
            publicPath: '/'
        },
        performance: {hints: false},
        plugins: [
            new MiniCSSExtractPlugin({
                chunkFilename: '[name].[chunkhash:8].css',
                filename: '[name].[hash:8].css'
            }),
            new HTMLWebpackPlugin({
                favicon: 'src/client/src/favicon.ico',
                template: 'src/client/src/index.html'
            })
        ]
    };

    if (mode === development) {
        config.devtool = 'sourcemap';
        config.entry.index = [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            config.entry.index
        ];
        config.module.rules[0].options = {plugins: ['react-hot-loader/babel']};
        config.module.rules[1].loaders[0] = 'style-loader';
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        );
    }

    return config;
};
