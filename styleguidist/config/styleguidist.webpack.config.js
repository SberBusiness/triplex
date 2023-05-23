const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const transpileDependencies = [
    'estree-walker',
    'regexpu-core',
    'strip-ansi',
    'ansi-regex',
    'ansi-styles',
    'react-dev-utils',
    'chalk',
    'unicode-match-property-ecmascript',
    'unicode-match-property-value-ecmascript',
    'acorn-jsx',
]

module.exports = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {loader: path.resolve(__dirname, './cssClassNameReplacer.js'),},
                    {loader: 'ts-loader'}
                ]

            }, {
                test: /\.js$/,
                exclude: (modulePath) =>
                    (/node_modules/.test(modulePath)) &&
                    !transpileDependencies.some((mod) => new RegExp(`node_modules[\\\\/]${mod}[\\\\/]`).test(modulePath)),
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceType: 'unambiguous',
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                    targets: {
                                        ie: '11'
                                    }
                                }
                            ],
                        ],
                    }
                }
            }, {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
        ]
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
        new CopyPlugin({
            patterns: [
                {from: './styleguidist/config/images/favicon.ico', to: './'},
                {from: './styleguidist/public', to: './styleguidist/public'},
            ],
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            STYLEGUIDIST_SETTINGS_MODE: false,
        }),
    ],
    devServer: {
        // Для доступа к приложению из Docker контейнера.
        disableHostCheck: true
    }
}
