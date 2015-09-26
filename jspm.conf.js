System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime"
    ],
    "stage": 1
  },
  paths: {
    "employee-scheduling-ui/*": "src/*.js",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.5",
    "angular-animate": "npm:angular-animate@1.4.5",
    "angular-bootstrap-colorpicker": "github:buberdds/angular-bootstrap-colorpicker@3.0.19",
    "angular-local-storage": "npm:angular-local-storage@0.2.2",
    "angular-messages": "npm:angular-messages@1.4.5",
    "angular-mocks": "npm:angular-mocks@1.4.5",
    "angular-sanitize": "npm:angular-sanitize@1.4.5",
    "angular-ui": "github:angular-ui/bootstrap-bower@0.13.4",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "babel": "npm:babel-core@5.8.24",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "bootstrap-css-only": "github:fyockm/bootstrap-css-only@3.3.5",
    "core-js": "npm:core-js@1.1.4",
    "css": "github:systemjs/plugin-css@0.1.16",
    "font-awesome": "npm:font-awesome@4.4.0",
    "json": "github:systemjs/plugin-json@0.1.0",
    "ng-bs-animated-button": "github:jeremypeters/ng-bs-animated-button@2.0.3",
    "ng-file-upload": "npm:ng-file-upload@7.2.0",
    "si-table": "github:simplicitylabs/si-table@0.2.3",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular-ui/ui-router@0.2.15": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:angular-animate@1.4.5": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:babel-runtime@5.8.24": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.16"
    },
    "npm:ng-file-upload@7.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});
