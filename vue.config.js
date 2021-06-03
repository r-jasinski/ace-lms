module.exports = {
  devServer: {
    port: 1337
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'ACE LMS'
      return args
    })
    /*
       Disable (or customize) prefetch, see:
       https://cli.vuejs.org/guide/html-and-static-assets.html#prefetch
    */
    config.plugins.delete('prefetch')

    /*
          Configure preload to load all chunks
          NOTE: use `allChunks` instead of `all` (deprecated)
       */
    config.plugin('preload').tap(options => {
      options[0].include = 'allChunks'
      return options
    })

    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  }
}
