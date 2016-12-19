//Set this in the commandline using export NODE_ENV=production (mac). Make SURE this is set to production before final export
var debug = process.env.NODE_ENV == "dev";
var debug = true;
var webpack = require('webpack');
var path = require('path');
var WebpackStrip = require('strip-loader');

module.exports = {   
    
  context: __dirname,    
     
  devtool: 'cheap-module-source-map',  
    
  entry: "./src/js/index.js", 
    
  module: {
      
    loaders: [
        
//        { 
//            //if debug is not enabled, remove console.log using striploader
//            test: /\.js$/, 
//            loader: debug ? '' : WebpackStrip.loader('debug', 'console.log') 
//        },
        
        {
            
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015', 'stage-0'],
              plugins: ['react-html-attrs'],
            }
            
        }
        
    ]
      
  },
    
  externals: {},
    
  output: { 
      
    path: __dirname + "/build/",
    filename: "index.js"
  
  },
    
  //if debug is not enabled, minify the heck out of everything
  plugins: debug ? [] : [
      
    new webpack.optimize.DedupePlugin(),
      
    new webpack.optimize.OccurenceOrderPlugin(),
      
    new webpack.optimize.UglifyJsPlugin({
        
          compress: {
              
            warnings: false,
            screw_ie8: true
              
          },
        
          comments: false,
          sourceMap: false
        
    }),
      
    new webpack.DefinePlugin({
        
        'process.env': {'NODE_ENV': JSON.stringify('production')}
    
    })
      
  ],
    
};