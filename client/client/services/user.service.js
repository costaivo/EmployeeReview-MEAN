(function() {

    function user($http, $window, constants) {

        var getSkills = function() {
            return $http.get(constants.baseUrl + constants.port + '/skill', {
                // headers: {
                //     Authorization: 'Bearer ' + getToken()
                // }
            });
        };


        return {
            getSkills: getSkills
        };
    };


    user.$inject = ['$http', '$window', 'constants'];
    angular.module("employeeApp").service('user', user);
}());
