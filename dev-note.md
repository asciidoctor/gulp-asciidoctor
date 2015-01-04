### install

-	npm install gulp --save-dev
-	npm install through-gulp --save-dev
-	asciidoctor.js
-	npm install asciidoctor.js --save-dev
-	npm install gulp-util --save-dev

### test

-	use npm install gulp-mocha
-	run
	-	mocha test.js

### debug

-	npm install --save-dev gulp-debug

### config options

entry function(options)

#### config code

```
var opts = Opal.hash2(['base_dir', 'safe', 'doctype', 'header_footer', 'attributes'], {
        'base_dir': 'file://'.concat(base_dir),
        'safe': options.safeMode,
        'doctype': options.doctype,
        'header_footer': options.header_footer,
        'attributes': attributes
    });
```

### default config

```
{
     cwd: process.cwd(),
      showTitle: true,
      showNumberedHeadings: true,
      showToc: true,
      header_footer: false,
      safeMode: 'secure',
      doctype: 'article',
      backend: 'html5'
}
```

```
// Define asciidoc attibutes
var attributes = [];
attributes.push(options.showTitle ? 'showtitle' : 'showtitle!');
attributes.push(options.showNumberedHeadings ? 'numbered' : 'numbered!');
attributes.push(options.showToc ? 'toc=preamble toc2!' : 'toc! toc2!');
attributes.push(options.doctype ? 'doctype='+options.doctype : 'article');
attributes.push(options.backend ? 'backend='+options.backend : 'html5');

if (options.attributes) {
  attributes = attributes.concat(options.attributes);
}

Opal.ENV['$[]=']("PWD",path.resolve());
```

### upload to npmjs.com

-	npm publish
