var assert = require('assert')
var path = require('path')
var Vinyl = require('vinyl')
var asciidoctor = require('..')

describe('Test fucntionality', function () {
  it('should compile asciidoctor to HTML', function (cb) {
    var stream = asciidoctor({
      doctype: 'inline',
      attributes: ['showtitle']
    })

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.html')
      assert.strictEqual(file.contents.toString(),
        '<strong>foo</strong>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: 'fixture.adoc',
      contents: Buffer.from('*foo*')
    }))

    stream.end()
  })

  it('should run ok without args', function (cb) {
    var stream = asciidoctor()

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.html')
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: 'fixture.adoc',
      contents: Buffer.from('*foo*')
    }))

    stream.end()
  })

  // Check extension
  it('should run ok with extension .newext', function (cb) {
    var stream = asciidoctor({
      extension: '.newext'
    })

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.newext')
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: 'fixture.adoc',
      contents: Buffer.from('*foo*')
    }))

    stream.end()
  })

  // header_footer: false,
  it('it should not emit header and footer', function (cb) {
    var stream = asciidoctor({
      header_footer: false,
      attributes: ['showtitle']
    })

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.html')
      assert.strictEqual(file.contents.toString(),
        '<div class="paragraph">\n<p><strong>foo</strong></p>\n</div>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: 'fixture.adoc',
      contents: Buffer.from('*foo*')
    }))

    stream.end()
  })

  // header_footer: true,
  it('it should emit header and footer', function (cb) {
    var stream = asciidoctor({
      header_footer: true,
      attributes: ['showtitle']
    })

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.html')
      assert.notStrictEqual(file.contents.toString(),
        '<div class="paragraph">\n<p><strong>foo</strong></p>\n</div>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: 'fixture.adoc',
      contents: Buffer.from('*foo*')
    }))

    stream.end()
  })

  // include with safe 'safe'
  it('should include a file by using relative path', function (cb) {
    var stream = asciidoctor({
      header_footer: false,
      safe: 'safe'
    })

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.html')
      assert.strictEqual(file.contents.toString(),
        '<div class="paragraph">\n<p><strong>foo</strong></p>\n</div>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: path.join(__dirname, '/fixture.adoc'),
      cwd: process.cwd(),
      base: __dirname,
      contents: Buffer.from(`
include::simple.adoc[]
`)
    }))

    stream.end()
  })

  // include with safe 'safe'
  it('should include a file by using relative path', function (cb) {
    var stream = asciidoctor({
      header_footer: false,
      safe: 'safe'
    })

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.html')
      assert.strictEqual(file.contents.toString(),
        '<div class="paragraph">\n<p><strong>foo</strong></p>\n</div>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: path.join(__dirname, '/fixture.adoc'),
      cwd: process.cwd(),
      base: __dirname,
      contents: Buffer.from(`
include::simple.adoc[]
`)
    }))

    stream.end()
  })

  // include with safe 'unsafe'
  it('should include a file by using relative path and safe-mode "unsafe"', function (cb) {
    var stream = asciidoctor({
      header_footer: false
    })

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.html')
      assert.strictEqual(file.contents.toString(),
        '<div class="paragraph">\n<p><strong>foo</strong></p>\n</div>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: path.join(__dirname, '/fixture.adoc'),
      cwd: process.cwd(),
      base: __dirname,
      contents: Buffer.from(`
include::simple.adoc[]
`)
    }))

    stream.end()
  })

  // include with safe 'safe'
  it('should include a file by using AsciiDoctor base_dir option', function (cb) {
    var stream = asciidoctor({
      header_footer: false,
      base_dir: path.join(__dirname, 'include'),
      safe: 'safe'
    })

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.html')
      assert.strictEqual(file.contents.toString(),
        '<div class="paragraph">\n<p><strong>bar</strong></p>\n</div>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: path.join(__dirname, '/fixture.adoc'),
      cwd: process.cwd(),
      base: __dirname,
      contents: Buffer.from(`
include::simple.adoc[]
`)
    }))

    stream.end()
  })

  // include with safe 'safe'
  it('should include a file by using AsciiDoctor base_dir option and safe_mode "unsafe"', function (cb) {
    var stream = asciidoctor({
      header_footer: false,
      base_dir: path.join(__dirname, 'include')
    })

    stream.once('data', function (file) {
      assert.strictEqual(file.relative, 'fixture.html')
      assert.strictEqual(file.contents.toString(),
        '<div class="paragraph">\n<p><strong>bar</strong></p>\n</div>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: path.join(__dirname, '/fixture.adoc'),
      cwd: process.cwd(),
      base: __dirname,
      contents: Buffer.from(`
include::simple.adoc[]
`)
    }))

    stream.end()
  })
})
