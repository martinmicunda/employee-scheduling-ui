Employee Scheduling UI
======================

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/martinmicunda/employee-scheduling-ui?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://secure.travis-ci.org/martinmicunda/employee-scheduling-ui.png)](http://travis-ci.org/martinmicunda/employee-scheduling-ui) [![devDependency Status](https://david-dm.org/martinmicunda/employee-scheduling-ui/dev-status.png)](https://david-dm.org/martinmicunda/employee-scheduling-ui#info=devDependencies) 

**Note: :warning: This project is under development.**

An UI component for [Employee Scheduling](https://github.com/martinmicunda/employee-scheduling) application. My talk from AngulaJS meetup in Dublin on "**How to start writing apps with ES6, AngularJS 1.x and JSPM**" can be found [here](http://martinmicunda.com/presentations/how-to-start-writing-apps-with-es6-angular-1x-and-jspm/how-to-start-writing-apps-with-es6-angular-1x-and-jspm.html#/).

## Demo
This demo is running from [gh-pages](https://github.com/martinmicunda/employee-scheduling-ui/tree/gh-pages) branch in backend-less development env (see [backend-less](#backend-less) section).

<a href="http://martinmicunda.github.io/employee-scheduling-ui/dist" target="_blank">Click here to see it in action!</a>

![Employee Scheduling screenshot](screenshot.png "Employee Scheduling screenshot")

## Features
  * Use ES6 with Angular 1.3
  * Use ES6 Modules via [SystemJS](https://github.com/systemjs/systemjs) and [ES6 Module Loader Polyfill](https://github.com/ModuleLoader/es6-module-loader)
  * Manage development and production workflow with [JSPM](http://jspm.io/), [SystemJS builder](https://github.com/systemjs/builder) and [Gulp](http://gulpjs.com/)
  * Mocked Backend Workflow - help with mocking backend-less development
  * Achieve some of the Angular 2.0 goals while still running on Angular 1.3.x
  * Produce optimised, production ready code for deployment and automatically deploy this code to [gh-pages](https://github.com/martinmicunda/employee-scheduling-ui/tree/gh-pages) after each commit via [Travis CI](https://travis-ci.org/martinmicunda/employee-scheduling-ui)

##<a name="installation-and-configuration"></a> Installation & Configuration

###<a name="platform-and-tools"></a> Platform & Tools
You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) (requires npm version >= 2.0.0 for this project) for installing NodeJS applications and libraries.

[Install node.js](http://nodejs.org/download/) (requires node.js version >= 0.10.0)

[Install Gulp](http://gulpjs.com/) as global npm modules (requires node.js version >= 0.10.0):

```bash
$ npm install -g gulp
```
###<a name="installation"></a> Installation

**1.** Clone or [fork](https://github.com/martinmicunda/employee-scheduling-ui/fork) this repository:
```bash
$ git clone git@github.com:martinmicunda/employee-scheduling-ui.git 
$ cd employee-scheduling-ui
```

**2.** Install local dependencies
```bash
$ npm install
```
> **Note:** Verify that all 3rd party dependencies from [package.json](package.json) are installed on your local machine. If you have followed the instructions and there have been no errors when executing the above commands, the dependencies should be installed.
     
## How to Run
### Development
TODO: add development local steps once the backend is completed

###<a name="backend-less"></a> Backend-less

####Advantages####
  * Parallel development with backend
  * Frontend can have a hand in defining API
  * Control over responses
  * Minimal impact on code
  * Backend-less development (continue development even when backend not available)
  * Useful for e2e tests
  * Useful for demoing UI work without backend
  
```bash
$ gulp serve
```

### Production
See [build](#build) section for more details how `build` is created.
```bash
$ gulp serve:dist
```

##<a name="build"> How to Build
The build task get app ready for production. The build task include concatenation, minification, compression, cdn etc. If there have been no errors when executing the build command, the build should be located in `build/dist` directory and this build is ready for uploading to the server! To initiate a full build, you simply run the follow task:
```bash
$ gulp build
```

If you want use CDN then add your CDN url to `PRODUCTION_CDN_URL` variable in [`gulpfile.js`](gulpfile.js) file and then run the build task with argument `--cdn` to replace local path with CDN url: 
```bash
$ gulp build --cdn
```

## How to Test
TODO

## How to Deploy
TODO

##Tips
```
# Maintenance 
npm update -g           #update all outdated global packages
npm update --save-dev   #update all outdated local packages (run from project directory) 
npm update npm -g       #self npm update
brew update && brew doctor
brew upgrade node       #update to latest node version
npm shrinkwrap --dev    #Lock down dependency versions 
```

##Roadmap
* switch from [Node.js](http://nodejs.org/) to [io.js](https://iojs.org/)
* switch form Gulp3 to Gulp 4

## License

    Copyright (c) 2014-2015 Martin Micunda  

    Source code is open source and released under the GNU GPL v3 license.
