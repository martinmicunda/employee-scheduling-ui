(function () {
    'use strict';

    /**
     * @ngInject
     */
    function Base64() {
        // TODO: add base 64 http://stackoverflow.com/questions/246801/how-can-you-encode-a-string-to-base64-in-javascript/247261#247261
        return {
            // this is used to parse the user profile
            decode: function(str) {
                var output = str.replace('-', '+').replace('_', '/');
                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base64url string!';
                }
                // base-64: atob decodes, btoa encodes
                return window.atob(output); // polyfill https://github.com/davidchambers/Base64.js
            }
        };

    }

    angular
        .module('mm.authentication')
        .factory('Base64', Base64);

})();
