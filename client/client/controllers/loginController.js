(function() {
    function loginController($scope, $rootScope, authentication, $location, constants) {

        $scope.login = function() {
            //take credentials
            //add a service called authentication that will do http post(user)
            $rootScope.user = {};
            authentication.login($scope.credentials)
                .error(function(err) {
                    $scope.errorMessage = constants.msgUsernamePasswordFailure;
                })
                .then(function(data) {
                    $scope.errorMessage = "";
                    //redirect to profile page	
                    $rootScope.user = data.data.user;
                    $location.path('profile');
                });
        };

    };
    loginController.$inject = ['$scope', '$rootScope', 'authentication', '$location', 'constants'];
    angular.module("employeeApp").controller("loginController", loginController);
}());
