(function () {
    'use strict';

    /**
     * @ngInject
     */
    function UserCtrl(User) {
        var vm = this;

        vm.submit = function() {
            if (vm.user) {
                vm.user.role = {
                    bitMask: 2,
                    title: 'user'
                };
                vm.user.avatar = 'me.jpg';
                User.create(vm.user).then(function (response) {
                    console.log('');
                });
            }
        };
//        self.isTest = function() {
//            return Restangular.all('api/users').getList().then(function (response) {
//                console.log("uhij");
//            });
//        };
    }

    angular
        .module('app')
        .controller('UserCtrl', UserCtrl);

})();

