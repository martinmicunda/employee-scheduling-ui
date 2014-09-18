(function () {
    'use strict';

    /**
     * @ngInject
     */
    function LoginCtrl($state, $scope, Authentication, LocalStorageService) {
        // Capture the 'this' context of the controller using vm, standing for ViewModel.
        // Use it to avoid having to call bind and unnecessary scoping issues.
        var vm = this;
        vm.submitted = false;
        vm.user = LocalStorageService.getUser();
        vm.copyrightDate = new Date();
        if(vm.user) {
            $scope.credentials = { email: vm.user.email, password: ''};
        }
        vm.signIn = function(credentials) {
//            var user = {firstName: 'Martin', lastName: 'Micunda', email: 'm@m.sk', role: {bitMask: 1, title: 'public'}, avatar: 'me.jpg'};
//            LocalStorageService.setUser(user);
//            $scope.showMessage = true;
//            console.log('dsds' + username + password);
            Authentication.login(credentials).success(function () {
                var user = Authentication.currentUser;
                var ac = Authentication.accessLevels;
                var us = LocalStorageService.getUser();

//              LocalStorageService.setUser(user);
                console.log('Succesful');
                $state.go('app.home');

            }).error(function(err) {
                console.log('error');
            });
        };

        vm.signOut = function() {
            Authentication.logout().then(function (data) {
                console.log('Succesful');
                $state.go('authentication.lock');
            }, function () {
                console.log('error');
            });
        };
        vm.isTest = function() {
            Authentication.isTest();
        };

        vm.isAuthenticated = function() {
            return Authentication.isAuthenticated();
        }
    }

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl)
        .directive('shakeThat', ['$animate', '$timeout', function($animate, $timeout) {

            return {
                require: '^form',
                scope: {
                    submit: '&',
                    submitted: '='
                },
                link: function(scope, element, attrs, form) {

                    // listen on submit event
                    element.on('submit', function() {

                        // tell angular to update scope
                        scope.$apply(function() {
                            // everything ok -> call submit fn from controller
                            if (form.$valid) return scope.submit();

                            // show error messages on submit
                            $timeout(function(){
                                scope.submitted = true;
                            }, 1100);

                            // shake that form
                            $animate.addClass(element, 'animation animating shake', function() {
                                $animate.removeClass(element, 'animation animating shake');
                            });

                        });

                    });

                }
            };

        }]);

})();
