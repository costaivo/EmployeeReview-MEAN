/*
Description : This controller is to register a new user.
Author : Darshani S

*/

(function() {
    function registrationController($scope, authentication, $location, constants, $window, $crypthmac) {
        $scope.button = true;


        $scope.register = function() {
            var password = $scope.credentials.password;
            var confirmPassword = $scope.credentials.confirmPassword;

            if (password != confirmPassword) {
                $scope.errorMessage = constants.msgPasswordMatchFailure;

            } else {
                $scope.errorMessage = "";
                var credentials = {
                    "username": $scope.credentials.username,
                    "password": $crypthmac.encrypt($scope.credentials.password, "")
                }

                authentication
                    .register(credentials)
                    .error(function(err) {
                        console.log("error" + err.message);
                        $scope.usernameErrorMessage = constants.msgUsernameRegisterFailure;

                    })
                    .success(function(data) {

                        swal({
                            title: "",
                            text: constants.msgUserRegisteredSuccess,
                            type: "info",
                            html: true,
                            showCancelButton: false,
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                        }, function() {
                            setTimeout(function() {
                                $window.location.reload();
                                window.location.href = '#/login';
                            }, 500);
                        });

                        console.log("success" + JSON.stringify(data));
                    });
            }
        }


    };
    registrationController.$inject = ['$scope', 'authentication', '$location', 'constants', '$window', '$crypthmac'];
    angular.module("employeeApp").controller("registrationController", registrationController);
}());
