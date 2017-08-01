const path = require('path');
const { resolve } = require('path');
const webpack = require('webpack');
const EncodingPlugin = require('webpack-encoding-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');
process.env.NODE_ENV = JSON.stringify('production');

// подключаем собственный модуль, который позволить добавить publicPath к
// ExtractTextPlugin в bootstrap-loader
const patchForPublicPathBootstrapLoader =
    require('./src/helpers/common/js/patchPublicPathBootstrapLoader');

// настраиваем встраиваемую опцию. Она будет добавляться через queryString
// лоадера, поэтому должна быть строкой в одинарных кавычках. Название
// свойства и его значение - в двойных кавычках через двоеточие
const optionPublicPathForBootstrapLoader = ' "publicPath":"../" ';

// составляем путь к файлу, который надо пропатчить
let patchTargetFile = resolve(__dirname) +
    '/node_modules/bootstrap-loader/lib/utils/buildExtractStylesLoader.js';

// выполняем функцию, которая сделает дело. Запускается она в синхронном
// блокируещем режиме. Так что если что пойдет не так, сборка просто не
// запустится.
patchForPublicPathBootstrapLoader(
    patchTargetFile, optionPublicPathForBootstrapLoader
);

// couldn't use this way because we can not define extractStylePlugin
// options, where we can set publicPath =(((. Yes you can set it manually
// in \node_modules\bootstrap-loader\lib\utils\buildExtractStylesLoader.js
// in query-string parameters ?{"omit":1,"remove":true}, but it is bad way
// to solve the problem.
// WE HAVE JUST DID IT NOW IN patchForPublicPathBootstrapLoader!!!

const bootstrapProdEntryPoint = 'bootstrap-loader/lib/bootstrap.loader' +
    '?extractStyles' +
    `&configFilePath=${__dirname}/.bootstraprc-production` +
    '!bootstrap-loader/no-op.js';

module.exports = {

  context: resolve(__dirname, 'src'),

  entry: {
    libs:[
      'core-js/client/core.min.js',
      // the core babel polyfills ES5, ES6, ES7,

      'whatwg-fetch/fetch.js',
      // the fetch polyfill. Babel core polyfill doesn't have it =(,

      'jquery',

      'react',

      'react-dom'
    ],

    index: [
      bootstrapProdEntryPoint,
      // making unique bootstrap styles from box

      './index.js'
      // the entry point of our app
    ]
  },

  output: {
    filename: 'js/[name].[chunkhash:4].js',
    // the output bundle

    path: resolve(__dirname, 'build'),
    /*  path: resolve( 'bundle'),*/

    publicPath: '',
    // necessary for HMR to know where to load the hot update chunks,

    chunkFilename: '[id].js'
  },

  resolve: {
    modules: ["node_modules", "src"],

    alias: {
      Helpers: path.resolve(__dirname, 'src/helpers'),
      Constants: path.resolve(__dirname, 'src/constants'),
      Actions: path.resolve(__dirname, 'src/constants/actions'),
      Reducers: path.resolve(__dirname, 'src/reducers'),
      ActionCreators: path.resolve(__dirname, 'src/actionCreators'),
      Containers: path.resolve(__dirname, 'src/containers'),
      Store: path.resolve(__dirname, 'src/store'),
      Components: path.resolve(__dirname, 'src/components'),
      Assets: path.resolve(__dirname, 'src/assets')
    }
  },

  devtool: false,

  module: {
    rules: [
      //-------- type of module - jsx
      {
        resource: {
          test: /\.jsx?$/i,
          include: resolve(__dirname, 'src')
        },

        use: [
          {
            loader: 'babel-loader',
            options: {}
          }
        ]

      },
      //-------- type of module - jsx

      //-------- type of module - css
      {
        resource: {
          test: /\.css$/i,
          include: resolve(__dirname, 'src')
        },

        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: true

              }
            }
          ]
        })

      },
      //-------- type of module - css

      //-------- type of module - scss
      {
        resource: {
          test: /\.scss$/i,
          include:[
            resolve(__dirname, 'src'),
            /font-awesome/
          ]
        },

        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                minimize: true

              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                data:'@import "common.scss";',
                includePaths:[
                  resolve(__dirname, "src/components/stateCommonBlocks/RootComponent")
                ]
              }
            }
          ]
        })

      },
      //-------- type of module - scss

      //-------- type of module - fonts
      {
        resource: {
          test: /(\.(woff|woff2|eot|ttf|otf)$)|(.*)font(.*)\.svg$/i,
        },

        use: [
          {
            loader: 'file-loader',
            options: {
              name: "assets/fonts/[name]-[hash:4].[ext]",
            }
          }
        ]

      },
      //-------- type of module - fonts

      //-------- type of module - images
      {
        resource: {
          test: /(\.(jpe?g|png|gif)$)|(^.((?!font).)*\.svg$)/i,
          exclude: /(.*)favicon(.*)/i,
        },

        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: "assets/images/[name]-[hash:4].[ext]"
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                removeDoctype: true,
                removeXMLProcInst: true,
                removeComments: true,
                removeMetadata: true
              }
            }
          }
        ]

      },
      //-------- type of module - images

      //-------- type of module - favicon
      {
        resource: {
          test: /(.*)favicon(.*)/i,
          include: resolve(__dirname, 'src')
        },

        use: [
          {
            loader: 'file-loader',
            options: {
              name: "assets/images/[name].[ext]"
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              svgo: {
                removeDoctype: true,
                removeXMLProcInst: true,
                removeComments: true,
                removeMetadata: true
              }
            }
          }
        ]

      }
      //-------- type of module - favicon
    ]
  },

  plugins: [

    new HtmlWebpackPlugin({
      title: 'ASER_FRONTED_dima',
      filename: 'index.html',
      template: resolve(__dirname, 'src/helpers/common/templates/index.html')
    }),

    new EncodingPlugin({
      encoding: 'UTF-8'
    }),
    // make common build with symbols with  specified encoding

    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:4].css',
      allChunks: true
    }),
    // write css code in file

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      React: 'react'
    }),

    new UglifyJSPlugin({
      comments: false,
      beautify: false
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync([
        path.join(__dirname, 'src/**/*.html'),
        path.join(__dirname, 'src/**/*.js'),
        path.join(__dirname, 'src/**/*.jsx'),
        path.join(__dirname, 'node_modules/bootstrap-sass/assets/javascripts/**/*.js')
      ]),
      minimize: true,
      purifyOptions: {
        whitelist: []
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "libs",
      // (the commons chunk name)

      filename: "js/[name].[chunkhash:4].js",
      // (the filename of the commons chunk)

    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    })

  ]
};

