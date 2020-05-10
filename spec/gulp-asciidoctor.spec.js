const chai = require('chai')
var expect = chai.expect

var path = require('path')
var Vinyl = require('vinyl')
var asciidoctor = require('..')

describe('Test fucntionality', function () {
  it('should compile asciidoctor to HTML', function (cb) {
    var stream = asciidoctor({
      doctype: 'inline',
      standalone: false,
      attributes: ['showtitle']
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
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
      expect(file.contents.toString()).to.contain('<!DOCTYPE html>')
      expect(file.relative).to.equal('fixture.html')
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
      expect(file.relative).to.equal('fixture.newext')
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: 'fixture.adoc',
      contents: Buffer.from('*foo*')
    }))

    stream.end()
  })

  // header_footer: false,
  it('it should not emit header and footer with header_footer option', function (cb) {
    var stream = asciidoctor({
      header_footer: false,
      attributes: ['showtitle']
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
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

  it('it should not emit header and footer with standalone option', function (cb) {
    var stream = asciidoctor({
      standalone: false,
      attributes: ['showtitle']
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
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
  it('it should emit header and footer with header_footer option', function (cb) {
    var stream = asciidoctor({
      header_footer: true,
      attributes: ['showtitle']
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.contain('<!DOCTYPE html>')
      expect(file.contents.toString()).to.contain(
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

  it('it should emit header and footer with standalone option', function (cb) {
    var stream = asciidoctor({
      standalone: true,
      attributes: ['showtitle']
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.contain('<!DOCTYPE html>')
      expect(file.contents.toString()).to.contain(
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

  it('it should NOT emit header and footer. standalone wins', function (cb) {
    var stream = asciidoctor({
      standalone: false,
      header_footer: true,
      attributes: ['showtitle']
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
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
      standalone: false,
      safe: 'safe'
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
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
      standalone: false,
      safe: 'safe'
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
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
      standalone: false
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
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
      standalone: false,
      base_dir: path.join(__dirname, 'include'),
      safe: 'safe'
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
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
      standalone: false,
      base_dir: path.join(__dirname, 'include')
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
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

it('should support a template', function (cb) {
  var stream = asciidoctor({
    standalone: false,
    base_dir: path.join(__dirname, 'include'),
    template_dirs: path.join(__dirname, 'templates')
  })
  stream.once('data', function (file) {
    expect(file.relative).to.equal('fixture.html')
    expect(file.contents.toString()).to.equal(
      '<p class="paragraph-nunjucks">foo</p>'
    )
  })

  stream.on('end', cb)

  stream.write(new Vinyl({
    path: 'fixture.adoc',
    contents: Buffer.from('foo')
  }))

  stream.end()
})

it('should support a standalone option', function (cb) {
  var stream = asciidoctor({
    standalone: true,
    base_dir: path.join(__dirname, 'include')
  })
  stream.once('data', function (file) {
    expect(file.relative).to.equal('fixture.html')
    expect(file.contents.toString()).to.contain('<!DOCTYPE html>')
  })

  stream.on('end', cb)

  stream.write(new Vinyl({
    path: 'fixture.adoc',
    contents: Buffer.from('foo')
  }))

  stream.end()
})

describe('Test converters', function () {
  it('should register a custom converter provided as a class', function (cb) {
    const CnvClass = require('./extensions/testConverterExportsClass')
    var stream = asciidoctor({
      standalone: false,
      attributes: ['showtitle'],
      converter: CnvClass
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
        '<p class="myclass"><strong>foo</strong></p>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: 'fixture.adoc',
      contents: Buffer.from('*foo*')
    }))

    stream.end()
  })

  it('should register a custom converter instantiated here', function (cb) {
    const CnvClass = require('./extensions/testConverterExportsClass')
    var stream = asciidoctor({
      standalone: false,
      attributes: ['showtitle'],
      converter: new CnvClass()
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
        '<p class="myclass"><strong>foo</strong></p>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: 'fixture.adoc',
      contents: Buffer.from('*foo*')
    }))

    stream.end()
  })

  it('should register a custom converter provided as a function', function (cb) {
    const cnvFunction = require('./extensions/testConverterExportsFunction')
    var stream = asciidoctor({
      standalone: false,
      attributes: ['showtitle'],
      converter: cnvFunction()
    })

    stream.once('data', function (file) {
      expect(file.relative).to.equal('fixture.html')
      expect(file.contents.toString()).to.equal(
        '<p><strong>foo</strong></p>'
      )
    })

    stream.on('end', cb)

    stream.write(new Vinyl({
      path: 'fixture.adoc',
      contents: Buffer.from('*foo*')
    }))

    stream.end()
  })
})
