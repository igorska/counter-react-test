const path = require('path');
const { resolve } = require('path');
const webpack = require('webpack');
const EncodingPlugin = require('webpack-encoding-plugin');



module.exports = {

  context: resolve(__dirname, 'src'),

  entry: [
    'react-hot-loader/patch.js',
    // activate HMR for React

    'webpack-dev-server/client/index.js?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server.js',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    'core-js/client/core.min.js',
    // the core babel polyfills ES5, ES6, ES7

    'whatwg-fetch/fetch.js',
    // the fetch polyfill. Babel core polyfill doesn't have it =(

    'bootstrap-loader',
    // making unique bootstrap styles from box

    './index.js'
    // the entry point of our app
  ],

  output: {
    filename: 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
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

  devtool: 'source-map',

  devServer: {

    overlay: {
      warnings: true,
      errors: true
    },

    stats: 'normal',

    historyApiFallback: true,

    watchOptions: {
      aggregateTimeout: 100,
      ignored: /(node_modules|dist|build)/
    },

    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

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

        use: [
          {
            loader: 'style-loader',
            options: {}
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]

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

        use: [
          {
            loader: 'style-loader',
            options: {}
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
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
              sourceMap: true
            }
          }
        ]

      },
      //-------- type of module - scss

      //-------- type of module - fonts
      {
        resource: {
          test: /(\.(woff|woff2|eot|ttf|otf)$)|(.*)font(.*)\.svg$/i
        },

        use: [
          {
            loader: 'file-loader',
            options: {
              name: "assets/fonts/[name]-[hash:4].[ext]"
            }
          }
        ]

      },
      //-------- type of module - fonts

      //-------- type of module - images
      {
        resource: {
          test: /(\.(jpe?g|png|gif|ico)$)|(^.((?!font).)*\.svg$)/i
        },

        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: "assets/images/[name]-[hash:4].[ext]"
            }
          }
        ]

      }
      //-------- type of module - images
    ]
  },

  plugins: [

    new EncodingPlugin({
      encoding: 'UTF-8'
    }),
    // make common build with symbols with  specified encoding

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      React: 'react'
    })

  ]
};