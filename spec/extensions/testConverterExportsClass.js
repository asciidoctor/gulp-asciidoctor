'use strict'
var asciidoctor = require('@asciidoctor/core')()

class TestConverterClass {
  constructor () {
    this.baseConverter = asciidoctor.Html5Converter.create()
  }

  convert (node, transform, opts) {
    const nodeName = transform || node.getNodeName()
    if (nodeName === 'paragraph') {
      return `<p class="myclass">${node.getContent()}</p>`
    }
    return this.baseConverter.convert(node, transform, opts)
  }
}

module.exports = TestConverterClass
