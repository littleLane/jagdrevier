module.exports = {
  devServer: {
    port: 8000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: 'subVueApp',
      libraryTarget: 'umd',
    },
  },
}
