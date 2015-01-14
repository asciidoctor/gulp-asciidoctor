'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var asciidoctor = require('./');

it('should compile asciidoctor to HTML', function (cb) {
    var stream = asciidoctor({
        doctype: 'inline',
        attributes: ['showtitle']
    });

    stream.once('data', function (file) {
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


it('should run ok without args', function (cb) {
    var stream = asciidoctor();

    stream.once('data', function (file) {
        assert.equal(file.relative, 'fixture.html');
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: 'fixture.md',
        contents: new Buffer('*foo*')
    }));

    stream.end();
});


// header_footer: false,
it('test case without header_footer', function (cb) {
    var stream = asciidoctor({
        header_footer: false,
        attributes: ['showtitle']
    });

    stream.once('data', function (file) {
        assert.equal(file.relative, 'fixture.html');
        assert.equal(file.contents.toString(),
            '<div class=\"paragraph\">\n<p><strong>foo</strong></p>\n</div>'
        );
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: 'fixture.md',
        contents: new Buffer('*foo*')
    }));

    stream.end();
});


// header_footer: true,
it('test case with header_footer', function (cb) {
    var stream = asciidoctor({
        header_footer: true,
        attributes: ['showtitle']
    });

    stream.once('data', function (file) {
        assert.equal(file.relative, 'fixture.html');
        assert.notEqual(file.contents.toString(),
            '<div class=\"paragraph\">\n<p><strong>foo</strong></p>\n</div>'
        );
    });

    stream.on('end', cb);

    stream.write(new gutil.File({
        path: 'fixture.md',
        contents: new Buffer('*foo*')
    }));

    stream.end();
});
