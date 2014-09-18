[![Build Status](https://secure.travis-ci.org/martinmicunda/mm-angular-error-http-handler.png)](http://travis-ci.org/martinmicunda/mm-angular-error-http-handler) [![devDependency Status](https://david-dm.org/martinmicunda/mm-angular-error-http-handler/dev-status.png)](https://david-dm.org/martinmicunda/mm-angular-error-http-handler#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/martinmicunda/mm-angular-error-http-handler/badge.png?branch=master)](https://coveralls.io/r/martinmicunda/mm-angular-error-http-handler?branch=master)

 mm-angular-error-http-handler
===================

The `mm.errorHttpHandler` module checks if any [`$http`](https://docs.angularjs.org/api/ng/service/$http) request has failed and if so automatically posts the error to [`Sentry`](https://getsentry.com/) or some custom reporting tool. For any http error you will be redirect to follow pages:

- 404 error status -> /404
- 0 error status   -> /500
- any other error  -> /500

> **Note:** It's up to you how you gonna handle route in your application and implement UI templates for each error. Have look for simple example in [demo](demo/index.html) and [gulp serve](https://github.com/martinmicunda/mm-angular-error-http-handler/blob/master/gulpfile.js#L243) task.

<br/>

> **Requirements:** AngularJS 1.2+, mm-angular-logger 0.3+ 

> **File Size:** 17.01Kb minified, 1.06Kb gzipped

## Install

Install via bower:
```bash
$ bower install mm-angular-error-http-handler
```

Inject the `mm.errorHttpHandler` module into your app:
```js
var app = angular.module('ErrorHttpDemo', [
    'mm.errorHttpHandler'
]);
```

## Configuration
By default posting error to reporting tool is turn off. This can be turn on by configuring the `errorHttpHandlerProvider`.

### Custom reporting tool:
It's up to you to provide your own back end implementation that accept `post` json request. Have look for simple example in [demo](demo/index.html) and [gulp serve](https://github.com/martinmicunda/mm-angular-error-http-handler/blob/master/gulpfile.js#L243) task.

```js
app.config(['errorHttpHandlerProvider', function (cfg) {
    cfg.setConfigAppErrorPrefix('demoApp'); // optional
    cfg.setConfigCustomDns('http://localhost:3000/error');
}]);
```

### Sentry reporting tool:
You need to create Sentry account to be able to send error data to [`Sentry`](https://getsentry.com/).

```html
<script src="//cdn.ravenjs.com/1.1.15/raven.min.js"></script>
```
```js
app.config(['errorHttpHandlerProvider', function (cfg) {
    var ravenConfig = {logger: 'javascript'};
    cfg.setConfigAppErrorPrefix('demoApp'); // optional
    cfg.setConfigRavenDns('https://7be.......491@app.getsentry.com/2...2');
    cfg.setConfigRavenConfig(ravenConfig); // optional
}]);
```

## Developers
Clone the repo, `git clone git://github.com/martinmicunda/mm-angular-error-http-handler.git`. 

The `mm-angular-error-http-handler` is tested with `karma` against the latest stable release of AngularJS.

```bash
$ npm install
$ gulp test
```
You can build the latest version using `gulp`.
```bash
$ gulp build
```
You can quickly hack around with:
```
$ gulp serve
```

## Release

> During the release process only [`dist`](dist), [`package.json`](package.json), [`bower.json`](bower.json) and [`CHANGELOG.md`](CHANGELOG.md) files should be edited and all steps should be done with **gulp tasks** and **not manually**!

- To push a new release:
  1. Update [`package.json`](package.json) and [`bower.json`](bower.json) version to new version with `gulp bump --type=(major|minor|patch)` 
  2. Build dist files with `gulp build`
  3. Generate changelog with `gulp changelog`
  4. Go through the changelog, and fix any mistakes or clarify any unclear commit messages
  5. Commit and push [`dist`](dist/), [`package.json`](package.json), [`bower.json`](bower.json) and [`CHANGELOG.md`](CHANGELOG.md) with `gulp release` 

## Versioning

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit <http://semver.org/>.

## Contributing
Please submit all pull requests the against master branch. If your code contains JavaScript patches or features, you should include relevant unit tests. See [CONTRIBUTING](CONTRIBUTING.md) file more details. Thanks!

## License

    The MIT License
    
    Copyright (c) 2014 Martin Micunda  

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
