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
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  meta: {
    "npm:angular-ui-calendar@1.0.2/src/calendar.js": {
      "globals": {
        "$": "npm:jquery@2.1.4",
        "angular": "angular",
        "moment": "npm:moment@2.10.6"
      }
    },
    "npm:fullcalendar-scheduler@1.1.0/dist/scheduler.js": {
      "globals": {
        "jQuery": "npm:jquery@2.1.4",
        "moment": "npm:moment@2.10.6"
      }
    }
  },

  map: {
    "ENV": "src/app/core/config/env.conditions.js",
    "angular": "github:angular/bower-angular@1.4.5",
    "angular-animate": "github:angular/bower-angular-animate@1.4.5",
    "angular-bootstrap-colorpicker": "github:buberdds/angular-bootstrap-colorpicker@3.0.19",
    "angular-local-storage": "npm:angular-local-storage@0.2.2",
    "angular-messages": "npm:angular-messages@1.4.5",
    "angular-mocks": "npm:angular-mocks@1.4.5",
    "angular-sanitize": "npm:angular-sanitize@1.4.5",
    "angular-ui": "github:angular-ui/bootstrap-bower@0.13.4",
    "angular-ui-calendar": "npm:angular-ui-calendar@1.0.2",
    "angular-ui-router": "npm:angular-ui-router@0.2.15",
    "awesome-bootstrap-checkbox": "npm:awesome-bootstrap-checkbox@0.3.6",
    "babel": "npm:babel-core@5.8.24",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "bootstrap-css-only": "github:fyockm/bootstrap-css-only@3.3.5",
    "core-js": "npm:core-js@1.1.4",
    "css": "github:systemjs/plugin-css@0.1.16",
    "font-awesome": "npm:font-awesome@4.4.0",
    "fullcalendar": "npm:fullcalendar@2.5.0",
    "fullcalendar-scheduler": "npm:fullcalendar-scheduler@1.1.0",
    "json": "github:systemjs/plugin-json@0.1.0",
    "moment": "npm:moment@2.10.6",
    "ng-bs-animated-button": "github:jeremypeters/ng-bs-animated-button@2.0.3",
    "ng-file-upload": "npm:ng-file-upload@7.2.0",
    "si-table": "github:simplicitylabs/si-table@0.2.3",
    "text": "github:systemjs/plugin-text@0.0.2",
    "urijs": "npm:URIjs@1.16.1",
    "github:angular/bower-angular-animate@1.4.5": {
      "angular": "github:angular/bower-angular@1.4.5"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:URIjs@1.16.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angular-ui-calendar@1.0.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angular-ui-router@0.2.15": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.24": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:font-awesome@4.4.0": {
      "css": "github:systemjs/plugin-css@0.1.16"
    },
    "npm:fullcalendar-scheduler@1.1.0": {
      "fullcalendar": "npm:fullcalendar@2.5.0",
      "jquery": "npm:jquery@2.1.4",
      "moment": "npm:moment@2.10.6",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:fullcalendar@2.5.0": {
      "jquery": "npm:jquery@2.1.4",
      "moment": "npm:moment@2.10.6",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jquery@2.1.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:moment@2.10.6": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ng-file-upload@7.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
