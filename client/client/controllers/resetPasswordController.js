(function() {
    function resetPasswordController($scope, $http, $routeParams, constants, $crypthmac, $location) {

        $scope.resetPassword = function() {
            if ($scope.credentials.passwordwordFirst != $scope.credentials.passwordwordSecond) {
                $scope.errorMessage = constants.msgPasswordMatchFailure;

            } else {
                var token = $routeParams.token;
                var newPassword = $crypthmac.encrypt($scope.credentials.passwordwordFirst, "");
                console.log($scope.credentials.passwordwordFirst, token);
                $http.post(constants.baseUrl + constants.port + '/user/setNewPassword', { password: newPassword }, { headers: { Authorization: 'Bearer ' + token } })
                    .error(function(err) {
                        swal({ html: true, title: "", text: err.message });
                    })
                    .success(function(data) {
                        swal({ html: true, title: "", text: data.message });
                        $location.path('login')
                    });
            }
        };


    };
    resetPasswordController.$inject = ['$scope', '$http', '$routeParams', 'constants', '$crypthmac', '$location'];
    angular.module("employeeApp").controller("resetPasswordController", resetPasswordController);
}());
