'use strict'

var fs = require('fs')
var path = require('path')

var express = require('express')
var rewrite = require('express-urlrewrite')

var webpack = require('webpack')
var webpackConfig = require('./webpack-dev-config')
var webpackCompiler = webpack(webpackConfig)

var app = express()

app.use(require('webpack-dev-middleware')(webpackCompiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}))

app.use(require('webpack-hot-middleware')(webpackCompiler))

fs.readdirSync(__dirname).forEach(function(file) {
  if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
  }
})

app.use(express.static(__dirname))

app.listen(8080, function() {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
