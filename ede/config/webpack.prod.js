const webpack = require('webpack')
const path = require('path')
const glob = require("glob");
const merge = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js')
const getEntry = function (){
    let entry = {};
    glob.sync('./src/assets191212/js/*.js')
        .forEach(function (name,index) {
        	const key = name.split('./src/assets191212/js/')[1]
        				.split('.')[0];
            entry[key] = name;
        });
    return entry;
};

const entryObj = getEntry();

const htmlArray = [];
Object.keys(entryObj).forEach(element => {
    htmlArray.push({
        _html: element,
        title: '',
        chunks: [element]
    })
});

module.exports =  merge(common, {
  mode: 'production',
  devtool: 'none',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        uglifyOptions: {
          // compress: { properties: false },
          ie8: true,
          mangle:true,
          output: {
            comments: false,
            beautify: false,
            quote_keys: false
          }
        }
      })
    ]
  },
  plugins: [
  	new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns:['../dist'],
        verbose: true,
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true
   	}),
    new MiniCssExtractPlugin({
        filename: "assets191212/css/[name].css",
        path: path.resolve(__dirname, '../dist'),
        publicPath:'./'
    }),
    new webpack.DefinePlugin({
      
    }),
    new CopyWebpackPlugin([
    	{ 
    		from: 'src/assets191212/js/lib', 
    		to: path.resolve(__dirname, '../dist/assets191212/js/lib'),
    		force:true
    	},{ 
    		from: 'src/assets191212/fonts', 
    		to: path.resolve(__dirname, '../dist/assets191212/fonts'),
    		force:true
    	},{ 
    		from: 'src/assets191212/img', 
    		to: path.resolve(__dirname, '../dist/assets191212/img'),
    		force:true
    	}
    ])
  ]
})
//const getCopyConfig = function (name, chunks) {
//  return {
//      from: `./src/${name}`,
//      to:path.resolve(__dirname, `../es6/${name}`),
//      force:true,
//      ignore:['*.html']
//  };
//};
//const copyConfig = [];
//
//htmlArray.forEach((element) => {
//		copyConfig.push(getCopyConfig(element._html, element.chunks));
//});
//module.exports.plugins.push(new CopyWebpackPlugin(copyConfig));