(function() {
    function home($scope, constants) {
        $scope.message = "Welcome";
        $scope.appVersion = 'version ' + constants.minor + '.' + constants.major + '.' + constants.build;
    };
    home.$inject = ['$scope', 'constants'];
    angular.module("employeeApp").controller("homeController", home);



}());
