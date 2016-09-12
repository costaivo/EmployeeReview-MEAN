/*
    Description : This service is to get task details from the database. This will calls the API from the backend
    which will return the details of tasks.
    Author : Nikhil U
*/
(function() {
    function task($http, $window, constants) {


        var getToken = function() {
            return $window.localStorage['mean-token'];
        };

        var getTaskDetails = function(projectId) {
            return $http.get(constants.baseUrl + constants.port + '/task/' + projectId, {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            }).success(function(data) {});
        };


        var addTask = function(taskDetails) {
            console.log('calling Add task API with token');
            console.log(getToken());
            return $http.put(constants.baseUrl + constants.port + '/task/add', taskDetails, {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            }).success(function(data) {});
        }


        return {
            getTaskDetails: getTaskDetails,
            addTask: addTask
        }
    };
    task.$inject = ['$http', '$window', 'constants'];
    angular.module("employeeApp").service('task', task);
}());
