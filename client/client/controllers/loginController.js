/*
Description : This controller is to handle login and logout operations.
Author : Darshani S

*/

(function() {

    function loginController($scope, $rootScope, authentication, $location, constants, $crypthmac) {

        $scope.login = function() {

            //send SHA512 hashed password JSON to login API
            var credentials = {
                "username": $scope.credentials.username,
                "password": $crypthmac.encrypt($scope.credentials.password, "")
            }

            authentication.login(credentials)
                .error(function(err) {
                    $scope.errorMessage = constants.msgUsernamePasswordFailure;
                })
                .then(function(data) {
                    $scope.errorMessage = "";
                    $location.path('profile')
                });

        };

    };

    loginController.$inject = ['$scope', '$rootScope', 'authentication', '$location', 'constants', '$crypthmac'];

    angular.module("employeeApp").controller("loginController", loginController);
}());
