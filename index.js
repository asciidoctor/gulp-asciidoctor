// PLUGIN_NAME: gulp-asciidoctor
var through = require('through-gulp')
var PluginError = require('plugin-error')
var replaceExt = require('replace-ext')
var asciidoctor = require('asciidoctor')()

/**
 * Test is the given object is a class
 * @param {object} obj The object to test
 */
function isClass (obj) {
  return typeof obj === 'function' && obj.name !== 'Object'
}

module.exports = function (theOptions = {}) {
  var options = theOptions || {}
  var asciidoctorOptions = {}

  // default config
  var extension = options.extension || '.html'
  // var extensionRegistry = asciidoctor.Extensions

  // AsciiDoctor options
  asciidoctorOptions.safe = options.safe || 'unsafe' // unsafe, safe, server or secure
  asciidoctorOptions.doctype = options.doctype || 'article' // book,inline
  asciidoctorOptions.attributes = options.attributes || ['showtitle']
  asciidoctorOptions.backend = options.backed || 'html5' // defaults to html5
  asciidoctorOptions.doctype = options.doctype || 'article' // defaults to article
  asciidoctorOptions.header_footer = (options.header_footer === undefined
    ? true : options.header_footer)

  // If user overrides extension registry, use his registry
  // if (options.extension_registry !== undefined) {
  //   extensionRegistry = options.extension_registry
  // }

  // Load converter if option is set
  if (options.converter !== undefined) {
    var cnv = options.converter
    if (isClass(options.converter)) {
      const CnvClass = options.converter
      cnv = new CnvClass()
    }

    if (typeof cnv.convert === 'function') {
      asciidoctor.ConverterFactory.register(cnv, asciidoctorOptions.backend)
    } else {
      throw new PluginError('gulp-asciidoctor', 'Provided custom converter must implement a convert() method')
    }
  }

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
