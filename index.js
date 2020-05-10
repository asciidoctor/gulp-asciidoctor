// PLUGIN_NAME: gulp-asciidoctor
var through = require('through-gulp')
var PluginError = require('plugin-error')
var replaceExt = require('replace-ext')
var asciidoctor = require('@asciidoctor/core')()

module.exports = function (theOptions = {}) {
  var options = theOptions || {}
  var asciidoctorOptions = { ...theOptions }

  // default config
  var extension = options.extension || '.html'

  // AsciiDoctor options
  asciidoctorOptions.safe = options.safe || 'unsafe' // unsafe, safe, server or secure
  asciidoctorOptions.doctype = options.doctype || 'article' // book,inline
  asciidoctorOptions.attributes = options.attributes || ['showtitle']
  asciidoctorOptions.backend = options.backed || 'html5' // defaults to html5
  asciidoctorOptions.doctype = options.doctype || 'article' // defaults to article
  asciidoctorOptions.standalone = options.standalone || false // defaults to false
  asciidoctorOptions.header_footer = (options.header_footer === undefined
    ? true : options.header_footer)

  // Extension is only used by gulp
  delete asciidoctorOptions.extension
  delete asciidoctorOptions.to_file
  delete asciidoctorOptions.to_dir
  delete asciidoctorOptions.mkdirs

  // creating a stream through which each file will pass
  var stream = through(function (file, encoding, callback) {
    // do whatever necessary to process the file
    if (file.isNull()) {
      callback(null, file)
      return
    }

    if (file.isStream()) {
      callback(new PluginError('gulp-asciidoctor',
        'Streaming not supported'))
      return
    }

    if (file.isBuffer()) {

    }

    // Set a base_dir if no one is given to resolve relative filenames
    // when using include::[]
    // see https://github.com/asciidoctor/gulp-asciidoctor/issues/5
    asciidoctorOptions.base_dir = theOptions.base_dir || file.dirname

    // just pipe data next, or just do nothing to process file later in flushFunction
    // never forget callback to indicate that the file has been processed.

    var data = asciidoctor.convert(file.contents.toString(),
      asciidoctorOptions)

    file.contents = Buffer.from(data)
    file.path = replaceExt(file.path, extension)

    callback(null, file)
  }, function (callback) {
    // just pipe data next, just callback to indicate that the stream's over
    // this.push(something);
    callback()
  })

  // returning the file stream
  return stream
}
