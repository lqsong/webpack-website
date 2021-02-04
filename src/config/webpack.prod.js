const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { stringified } = require('./server/env');

module.exports = function (env, argv) {
    return merge(common(env, argv), {
        mode: 'production',
        plugins: [
          // 提取css
          new MiniCssExtractPlugin({
            filename: 'css/[name].css?[contenthash]'
          }),
          // 压缩css
          new CssMinimizerWebpackPlugin({
            parallel: true,
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                },
              ]
            }
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.join(__dirname, '../../public'),
                globOptions: {
                  ignore: ['.*'],
                },
              },
            ],
          }),
          new CleanWebpackPlugin(),
          new webpack.DefinePlugin({
              ...stringified
          })
        ],
        optimization: {
          runtimeChunk: 'single',
          splitChunks: {
            cacheGroups: {
                // 独立jquery
                jquery: {
                    name: 'jquery',
                    test: (module) => {
                        return /jquery/.test(module.context);
                        // return /jquery|lodash/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 100,
                },
                // 独立bootstrap
                bootstrap: {
                    name: 'bootstrap',
                    test: (module) => {
                        return /bootstrap/.test(module.context);
                    },
                    chunks: 'initial',
                    priority: 99,
                },
                // 其他        
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 2 
                },
                // 打包公共模块
                common: {
                    test: /[\\/]src[\\/]/,
                    name: 'common', // 提取出来的文件命名
                    chunks: 'all', // 分必须三选一： "initial"(初始化) | "all" | "async"(默认就是异步)
                    minChunks: 2, // 引入两次及以上被打包
                    minSize: 0, // 表示提取公共部分最小的大小
                    priority: 1 // 优先级
                }
            }
          }         
        }
    });
}
