/*
Description : This controller is to handle login and logout operations.
Author : Darshani S

*/

(function() {

    function loginController($scope, $rootScope, authentication, $location, constants, $crypthmac) {

        $scope.login = function() {

            //send SHA512 hashed password JSON to login API
            var credentials = {
                "userName": $scope.credentials.userName,
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
        $scope.sendForgotEmail = function() {
            authentication
                .resetUserPasswordEmail($scope.credentials.userName)
                .success(function(data) {
                    console.log("Data : " + JSON.stringify(data));
                    swal({ html: true, title: "", text: data.message });
                    $location.path('login')
                })
                .error(function(err) {
                    console.log(err);
                    swal({ html: true, title: "", text: error.message });
                    $location.path('login')
                })
        };

    };

    loginController.$inject = ['$scope', '$rootScope', 'authentication', '$location', 'constants', '$crypthmac'];

    angular.module("employeeApp").controller("loginController", loginController);
}());
