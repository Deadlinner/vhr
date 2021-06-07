const glob = require("glob");
const buildConfig = require("./config");

module.exports = {
  getMultiEntries: function () {
    let self = this
    let pages = self.getMultiFiles('src/' + buildConfig.moduleName + '/**/*.html')
    return {
      pages: pages
    }
  },

  getMultiFiles: function (globPath) {
    // get multi pages's entry and template
    let entries = {}

    glob.sync(globPath).forEach(function (entry) {
      let pathList = entry.split('/')
      console.log(pathList)
      debugger
      pathList.splice(-1)
      let pathname = pathList.slice(-1)[0]
      let chunks
      if (process.env.NODE_ENV === 'production') {
        chunks = ['chunk-vendors', 'chunk-common', 'vendor-' + pathname, pathname]
      } else {
        chunks = ['chunk-vendors', 'chunk-common', 'vendor-' + pathname, 'mock', pathname]
      }
      entries[pathname] = Object.assign({
        entry: pathList.join('/') + '/' + pathname + '.js',
        template: pathList.join('/') + '/' +  pathname + '.html',
        filename:  pathname + '.html',
        chunks: chunks
      })
    })
    return entries
  }
}