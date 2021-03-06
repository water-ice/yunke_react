const webpack =require('webpack');//引入webpack
const opn =require('opn');//打开浏览器
const merge =require('webpack-merge');//webpack配置文件合并
const path =require("path");
const baseWebpackConfig =require("./webpack.base.conf");//基础配置
const webpackFile =require("./webpack.file.conf");//一些路径配置

let config = merge(baseWebpackConfig, {
    /*设置开发环境*/
    mode:'development',
    output: {
        path: path.resolve(webpackFile.devDirectory),
        filename:'js/[name].js',
        chunkFilename: "js/[name].js",
        publicPath:''
    },
    optimization: {
        //包清单
        runtimeChunk: {
            name: "manifest"
        },
        //拆分公共包
        splitChunks: {
            cacheGroups: {
                //项目公共组件
                common: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                //第三方组件
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        /*设置热更新*/
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                use: [
                    'cache-loader',
                    'babel-loader',
                ],
                include: [
                    path.resolve(__dirname, "../../app"),
                    path.resolve(__dirname, "../../entryBuild")
                ],
                exclude: [
                    path.resolve(__dirname, "../../node_modules")
                ],
            },
            {
                test:/\.(css|scss)$/,
                use: [
                    {
                      loader: "style-loader" // 将 JS 字符串生成为 style 节点
                    },
                    {
                      loader: "sass-loader" // 将 Sass 编译成 CSS
                    },
                    {
                      loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    }
                ],
                exclude: [
                    path.resolve(__dirname, "../../node_modules")
                ],
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                loader: 'file-loader?name=[name].[ext]&outputPath=' + webpackFile.resource + '/',
            }
        ]
    },
    /*设置api转发*/
    devServer: {
        host:'0.0.0.0',
        port:8080,
        hot:true,
        inline:true,
        contentBase: path.resolve(webpackFile.devDirectory),
        historyApiFallback:true,
        disableHostCheck:true,
        proxy: [
            {
                context: ['/api/**', '/u/**'],
                target:'http://192.168.12.100:8080/',
                secure:false
            }
        ],
        /*打开浏览器 并打开本项目网址*/
        after() {
            opn('http://localhost:' +this.port);
        }
    }
});
module.exports = config;