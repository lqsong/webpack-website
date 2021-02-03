
const fs = require('fs');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

// 获取所有页面
const getPages = () => {
    let entry = {};
    let htmlWebpackPlugin = [];
    const pagesPath = path.join(__dirname, "../pages");
    const pageFiles = fs.readdirSync(pagesPath);
    pageFiles.forEach(function(item,index) {
        let stat = fs.statSync(path.join(pagesPath,item));
        if (stat.isDirectory() === true) {
            const mainJsPath = path.join(pagesPath, item, 'main.ts');
            const mainHtmlPath = path.join(pagesPath, item, 'main.html');

            try {
                fs.accessSync(mainJsPath, fs.constants.F_OK);
                fs.accessSync(mainHtmlPath, fs.constants.F_OK);
                // js 入口
                entry[item] = mainJsPath;
                // html 页面
                htmlWebpackPlugin.push(
                  new HtmlWebpackPlugin({
                    title: item,
                    template: mainHtmlPath,
                    filename: `${item}.html`,
                    chunks: [item],
                    inject: true,
                    minify: false
                  })
                );

            } catch (err) {
                console.error(err);
            }
        }
    });

    return  {
      entry,
      htmlWebpackPlugin,
      pagesPath
    }

}

module.exports =  function(env, argv) {

    const { entry, htmlWebpackPlugin } = getPages();

    return {
        entry: entry,
        output: {
            path: path.resolve(__dirname, "../../dist"),
            filename: "js/[name].js?[chunkhash:8]",
            publicPath: ''
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              use: 'babel-loader',
              exclude: /node_modules/
            },
            {
              test: /\.js$/,
              loader: 'eslint-loader',
              enforce: "pre",
              include: [path.resolve(__dirname, '../../src')], // 指定检查的目录
              exclude: /config/,
              options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
                  formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范, eslint-friendly-formatter可以让eslint的错误信息出现在终端上
              }
            },
            {
              test: /\.ts(x)?$/,
              loader: 'ts-loader',
              exclude: /node_modules/
            },
            {
              test: /\.ts(x)?$/,
              loader: 'eslint-loader',
              enforce: "pre",
              include: [path.resolve(__dirname, '../../src')], // 指定检查的目录
              exclude: /config/,
              options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
                  formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范, eslint-friendly-formatter可以让eslint的错误信息出现在终端上
              }
            },
            {
              test: /\.css$/,
              use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1
                  }
                },
                'postcss-loader'
              ],
              exclude: /\.module\.css$/
            },
            {
              test: /\.css$/,
              use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    modules: true
                  }
                },
                'postcss-loader'
              ],
              include: /\.module\.css$/
            },
            {
              test: /\.scss$/,
              use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
              ]
            },
            {
                test:/\.(png|jpg|gif|jpeg)/, // 是匹配图片文件后缀名
                use:[{
                    loader:'url-loader', // 指定使用的loader和loader的配置参数
                    options:{
                        limit: false,  // 是把小于5KB(limit: 5 * 1024)的文件打成Base64的格式，写入JS
                        esModule: false,
                        name: '[name].[ext]?[contenthash]',
                        outputPath: './img/'  // 打包后的图片放到img文件夹下
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use:['html-withimg-loader']
            },

            // 设置 jquery 全局
            {
              test: require.resolve("jquery"),
              loader: "expose-loader",
              options: {
                exposes: ["$", "jQuery"],
              },
            },
          ]
        },
        plugins: [
          ...htmlWebpackPlugin                          
        ],
        resolve: {
          extensions: [
            '.tsx',
            '.ts',
            '.js'
          ]
        }
    }

};