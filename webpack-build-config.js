process.env.NODE_ENV = 'production'

var fs = require('fs')
var path = require('path')

var webpack = require('webpack')

// Create an entry for each example, using its directory name
var entries = fs.readdirSync(__dirname).reduce(function(entries, dir) {
  try {
    var indexModule = path.join(__dirname, dir, 'index.js')
    fs.statSync(indexModule)
    entries[dir] = indexModule
  }
  catch (e) {
    // pass
  }
  return entries
}, {})

module.exports = {
  devtool: 'source-map',

  entry: entries,

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    preLoaders: [
      {test: /\.js$/, loader: 'eslint', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.(gif|jpe?g|png|otf|eot|svg|ttf|woff|woff2).*$/, loader: 'file?name=[name].[ext]'}
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    })
  ]
}
