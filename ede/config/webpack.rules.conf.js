const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const path = require('path');

const devMode = process.env.NODE_ENV !== 'prod';
const cssLoader = {
	'development':["style-loader", "css-loader", "sass-loader"],
	'prod':[{
		 loader:MiniCssExtractPlugin.loader,
		 options: {
                publicPath: '../../',
          }
	},"css-loader",{
        loader: "postcss-loader"
    },"sass-loader"]
}[process.env.NODE_ENV];

const rules = [
	{
        test: /\.(css|scss|sass)$/,
        // 区别开发环境和生成环境
        use: cssLoader
    },
    {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [{
            loader: "babel-loader"
        }]
    },
    {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
            // 需要下载url-loader
            loader: "url-loader",
            options: {
            	name: '[name].[ext]',
                limit:0, //小于这个时将会已base64位图片打包处理
                // 图片文件输出的文件夹
                publicPath: "",
                useRelativePath:true,
                outputPath: 'assets191212/img'
            }
        }]
    },
//  {
//      test: /\.(eot|woff|ttf|svg)$/,
//      use: [
//        {
//          loader: 'url-loader',
//          options: {
//            name: '[name].[ext]',
//            limit: 0, // fonts file size <= 5KB, use 'base64'; else, output svg file
//            publicPath: "",
//            useRelativePath:true,
//            outputPath: 'assets191212/fonts'
//          }
//        }
//      ]
//  },
    {
        test: /\.html$/,
        // html中的img标签
        use: ['html-loader?interpolate']
    }
];

module.exports = rules;