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

-
