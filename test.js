'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var asciidoctor = require('./');

it('should compile asciidoctor to HTML', function(cb) {
    var stream = asciidoctor({
        doctype: 'inline',
        attributes: ['showtitle']
    });

    stream.once('data', function(file) {
        assert.equal(file.relative, 'fixture.html');
        assert.equal(file.contents.toString(),
            '<strong>foo</strong>'
        );
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: 'fixture.md',
        contents: new Buffer('*foo*')
    }));

    stream.end();
});
