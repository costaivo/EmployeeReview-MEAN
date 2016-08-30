(function() {
    function registrationController($scope, authentication, $location, constants, $window) {
        $scope.button = true;


        $scope.register = function() {
            var password1 = $scope.credentials.password;
            var password2 = $scope.credentials.confirmPassword;
            var credentials = $scope.credentials;

            if (password1 != password2) {
                $scope.errorMessage = constants.msgPasswordMatchFailure;

            } else {
                $scope.errorMessage = "";

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
                        //$location.path('profile');
                    });
            }
        }


    };
    registrationController.$inject = ['$scope', 'authentication', '$location', 'constants', '$window'];
    angular.module("employeeApp").controller("registrationController", registrationController);
}());
