'use strict'
const utils = require('./utils')
const config = require('../config')
const isDevelopment = process.env.NODE_ENV === 'development'
const sourceMapEnabled = isDevelopment ? config.dev.cssSourceMap : config.build.productionSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: !isDevelopment
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
