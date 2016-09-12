/*
    Description : This service is to get project details from the database. This will calls the API from the backend
    which will return the details of projects.
    Author : Nikhil U
*/
(function() {

    function project($http, $window, constants) {

        var getToken = function() {
            return $window.localStorage['mean-token'];
        };

        var getAllProjects = function() {
            return $http.get(constants.baseUrl + constants.port + '/project/all').success(function(data) {});
        };


        return {
            getAllProjects: getAllProjects
        }
    };
    project.$inject = ['$http', '$window', 'constants'];
    angular.module("employeeApp").service('project', project);
}());
