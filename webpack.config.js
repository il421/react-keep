const path = require('path');
// const PACKAGE = require('./package.json');

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
  let isProduction = false;

  if (typeof env !== 'undefined' && env.production) {
    require('dotenv').config({ path: '.env.production' });
    isProduction = true;
  } else {
    require('dotenv').config({ path: '.env.development' });
  }

  const minCssExtract = new MiniCssExtractPlugin({
    filename: 'style.css',
  });
  // const compressionPlugin = new CompressionPlugin();
  // const BundleAnalyzer = new BundleAnalyzerPlugin();
  const cleanWebpackPlugin = new CleanWebpackPlugin();
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: '../index.html',
    template: 'src/index.ejs'
  });

  return {
    entry: ['@babel/polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      // filename: 'bundle.js?v=' + PACKAGE.version,
      filename: 'bundle.[contenthash].js',
    },

    optimization: {
      minimizer: [ new TerserPlugin() ],
    },

    stats: {
      entrypoints: false,
      children: false
    },

    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                config: {
                  path: 'postcss.config.js'
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      minCssExtract,
      // compressionPlugin,
      // BundleAnalyzer,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
      }),
      cleanWebpackPlugin,
      htmlWebpackPlugin
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/',
      host: 'dev.my-keep.co.nz',
      port: 9000,
    },
    performance: {
      hints: false
    }
  };
};
