[![Build Status](https://secure.travis-ci.org/martinmicunda/mm-angular-logger.png)](http://travis-ci.org/martinmicunda/mm-angular-logger) [![devDependency Status](https://david-dm.org/martinmicunda/mm-angular-logger/dev-status.png)](https://david-dm.org/martinmicunda/mm-angular-logger#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/martinmicunda/mm-angular-logger/badge.png?branch=master)](https://coveralls.io/r/martinmicunda/mm-angular-logger?branch=master)

 mm-angular-logger
===================
![Screenshot](screenshot.png)

An AngularJS module that provides enhanced support for [`$log`](https://docs.angularjs.org/api/ng/service/$log) service. This module adds more features for [`$log`](https://docs.angularjs.org/api/ng/service/$log) service like a timestamp, hint about where the message was created, turn off all or specific kind of messages (like info() and debug()). Demo: http://fiddle.jshell.net/

> **Requirements:** AngularJS 1.2+ 

> **File Size:** 2.4Kb minified, 0.5Kb gzipped

## Install

Install via bower:
```bash
$ bower install mm-angular-logger
```

Inject the `mm.logger` module into your app::
```js
var app = angular.module('LoggerDemo', [
    'mm.logger'
]);
```
## Configuration

### Turn the all logs off:
The default behaviour is to log all kind of messages. This can be disabled by configuring the `LoggerProvider` like this:

```js
app.config(['LoggerProvider', function (LoggerProvider) {
    LoggerProvider.disabled();
}]);
```

### Turn the certain kind of logs off:
To disable certain kind of messages can be done by configuring the `LoggerProvider` like this:

```js
app.config(['LoggerProvider', function (LoggerProvider) {
    LoggerProvider.disabled([LoggerProvider.level.INFO, LoggerProvider.level.DEBUG]);
}]);
```

There are 5 log levels:
```js
LoggerProvider.level.LOG
LoggerProvider.level.INFO
LoggerProvider.level.DEBUG
LoggerProvider.level.WARN
LoggerProvider.level.ERROR
```    
## Usage
This logger support interpolate variables into the message string so these are valid logger implementations:

```js
var logger = Logger.getLogger('LoggerExample'); // Name of the file, class, module or anything meaningful.
logger.log('This is an log message.'); 
logger.info('This is an info message with {0}', ['interpolate variable.']); 
logger.error('This is a {0} error! {1}', [ 'big', 'Just kidding!' ]); 
```
This logger is also working with exception that have a type of `Error`:

```js
logger.error(msg, null, exception);
```
## Developers
Clone the repo, `git clone git://github.com/martinmicunda/mm-angular-logger.git`. 

`mm-angular-logger` is tested with `karma` against the latest stable release of AngularJS.

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

## Commit Conventions
Use these [commit conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit) to generate a changelog from git metadata. Some example output can be found [here](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md).

## Versioning

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit <http://semver.org/>.

## Contributing
Please submit all pull requests the against master branch. If your unit test contains JavaScript patches or features, you should include relevant unit tests. Thanks!

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
