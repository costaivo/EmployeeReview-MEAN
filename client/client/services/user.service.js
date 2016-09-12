(function() {

    function user($http, $window, constants) {

        var getSkills = function() {
            return $http.get(constants.baseUrl + constants.port + '/skill', {
                headers: {
                    Authorization: 'Bearer ' + $window.localStorage['mean-token']
                }
            });
        };

        var addSkill = function(skill) {
            return $http.post(constants.baseUrl + constants.port + '/skill/addOne',skill, {
                headers: {
                    Authorization: 'Bearer ' + $window.localStorage['mean-token']
                }
            });
        };


        return {
            getSkills: getSkills,
            addSkill: addSkill
        };
    };


    user.$inject = ['$http', '$window', 'constants'];
    angular.module("employeeApp").service('user', user);
}());
