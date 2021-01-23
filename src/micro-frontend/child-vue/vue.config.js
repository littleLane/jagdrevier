module.exports = {
  configureWebpack: {
    output: {
      library: 'singleVue',
      libraryTarget: 'umd'
    },
    devServer: {
      port: 4004,
      overlay: {
        warnings: false,
        errors: false
      }
    }
  }
}
