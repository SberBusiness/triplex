/* eslint-env node */
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const transpileDependencies = [
    'acorn-jsx',
    'ansi-regex',
    'ansi-styles',
    'chalk',
    'estree-walker',
    'react-dev-utils',
    'regexpu-core',
    'strip-ansi',
    'unicode-match-property-ecmascript',
    'unicode-match-property-value-ecmascript',
];

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceType: 'unambiguous',
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: 3.38,
                                    targets: {
                                        ie: '11',
                                    },
                                },
                            ],
                        ],
                    },
                },
                exclude: (path) => (/node_modules/.test(path)) &&
                    !transpileDependencies.some((name) => new RegExp(`node_modules[\\\\/]${name}[\\\\/]`).test(path)),
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {loader: path.resolve(__dirname, './cssClassNameReplacer.js')},
                    {loader: 'ts-loader'},
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                paths: [path.resolve(__dirname, "../../")],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
        ],
    },
    resolve: {
        alias: {
            '@sberbusiness/triplex/styles': path.resolve(__dirname, '../../out/styles'),
            '@sberbusiness/triplex': path.resolve(__dirname, '../../src'),
            '@styles': path.resolve(__dirname, '../../out/styles'),
            'rsg-components/StyleGuide/StyleGuideRenderer': path.resolve(__dirname, '../../node_modules/react-styleguidist/lib/client/rsg-components/StyleGuide/StyleGuideRenderer'),
            'rsg-components/Markdown/Table': path.resolve(__dirname, '../../node_modules/react-styleguidist/lib/client/rsg-components/Markdown/Table'),
            'rsg-components/Markdown/Pre': path.resolve(__dirname, '../../node_modules/react-styleguidist/lib/client/rsg-components/Markdown/Pre'),
            'rsg-components/Markdown/List': path.resolve(__dirname, '../../node_modules/react-styleguidist/lib/client/rsg-components/Markdown/List'),
            'rsg-components/Markdown/Blockquote': path.resolve(__dirname, '../../node_modules/react-styleguidist/lib/client/rsg-components/Markdown/Blockquote'),
            'rsg-components/Markdown/Checkbox': path.resolve(__dirname, '../../node_modules/react-styleguidist/lib/client/rsg-components/Markdown/Checkbox'),
            'rsg-components/Markdown/MarkdownHeading': path.resolve(__dirname, '../../node_modules/react-styleguidist/lib/client/rsg-components/Markdown/MarkdownHeading'),
            'rsg-components/Markdown/Details': path.resolve(__dirname, '../../node_modules/react-styleguidist/lib/client/rsg-components/Markdown/Details'),
            'rsg-components/Markdown/Hr': path.resolve(__dirname, '../../node_modules/react-styleguidist/lib/client/rsg-components/Markdown/Hr'),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            STYLEGUIDIST_SETTINGS_MODE: false,
            npm_package_version: process.env.npm_package_version,
        }),
        new CopyPlugin({
            patterns: [
                {from: './styleguidist/config/images/favicon.ico', to: './'},
                {from: './styleguidist/public', to: './styleguidist/public'},
            ],
        }),
    ],
    devServer: {
        // Для доступа к приложению из Docker контейнера.
        allowedHosts: 'all',
    },
    devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
};
