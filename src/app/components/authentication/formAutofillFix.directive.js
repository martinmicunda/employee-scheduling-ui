(function () {
    'use strict';

    /**
     * @ngInject
     * @resource http://victorblog.com/2014/01/12/fixing-autocomplete-autofill-on-angularjs-form-submit/  \  https://medium.com/opinionated-angularjs/techniques-for-authentication-in-angularjs-applications-7bbf0346acec
     */
    function formAutofillFix($timeout) {
        return function (scope, element, attrs) {
            element.prop('method', 'post');
            if (attrs.ngSubmit) {
                $timeout(function () {
                    element
                        .unbind('submit')
                        .bind('submit', function (event) {
                            event.preventDefault();
                            element
                                .find('input, textarea, select')
                                .trigger('input')
                                .trigger('change')
                                .trigger('keydown');
                            scope.$apply(attrs.ngSubmit);
                        });
                });
            }
        };
    }

    angular
        .module('mm.authentication')
        .directive('formAutofillFix', formAutofillFix);

})();