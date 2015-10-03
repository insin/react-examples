process.env.NODE_ENV = 'development'

var fs = require('fs')
var path = require('path')

var webpack = require('webpack')

// Create an entry for each example, using its directory name as the bundle name
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

// Use the shared entry for hot loading dependencies
entries['shared'] = [
  // Polyfill EventSource for IE, as webpack-hot-middleware/client uses it
  'eventsource-polyfill',
  'webpack-hot-middleware/client'
]

module.exports = {
  devtool: 'eval',

  entry: entries,

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin('shared', 'shared.js')
  ],

  module: {
    preLoaders: [
      {test: /\.js$/, loader: 'eslint', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.(gif|jpe?g|png|otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url?limit=10240'}
    ]
  }
}
