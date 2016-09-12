/*
Description : This controller is to display tasks, comments and add comments.
Author : Nikhil U

*/
(function() {
    function taskController($scope, project, task, $location, $window, $http) {


        $scope.tasks = [];
        var skip = 0;
        var paginate = false;
        var projectId = "";
        var count = 0;


        $scope.getProjects = function() {
            project.getAllProjects()
                .success(function(data) {
                    $scope.projects = data.projects;
                })
                .error(function(error) {
                    console.log(error);
                });
        };
        $scope.scrollingPaginate = function() {
            if (projectId != $scope.projectId) {
                skip = 0;
                paginate = true;
                count = 0;
                projectId = $scope.projectId;
                $scope.tasks = [];
            }
            if ((skip <= count) && paginate) {
                paginate = false;
                if (projectId != undefined) {
                    $http.get(constants.baseUrl + constants.port + '/task/' + $scope.projectId + '?skip=' + skip, {
                        headers: {
                            Authorization: 'Bearer ' + $window.localStorage['mean-token']
                        }
                    }).success(function(response) {
                        var tasks = response.tasks;
                        count = response.total;
                        if (tasks.length == 0) {

                        } else {

                            if (skip <= count) {
                                skip = skip + 3;
                                for (var i = 0; i < tasks.length; i++) {
                                    $scope.tasks.push(tasks[i]);
                                }
                            }
                        }
                        paginate = true;
                    }).error(function(error) {
                        console.log(error);
                    });
                }
            }
        };

        $scope.addTask = function() {

            var taskDetails = {
                "taskName": $scope.taskName,
                "description": $scope.description,
                "userRating": $scope.rating,
                "projectId": $scope.projectId
            };
            if (!$scope.rating)
                taskDetails.rating = "0";

            task.addTask(taskDetails).success(function(data) {
                    swal({ html: true, title: "", text: data.message }, function() {
                        $window.location.reload();
                    });
                })
                .error(function(error) {
                    console.log(error);
                    swal({ html: true, title: "", text: data.message });
                    $location.path('task')
                });
            console.log(taskDetails);
        };

    };
    taskController.$inject = ['$scope', 'project', 'task', '$location', '$window', '$http'];
    angular.module("employeeApp").controller("taskController", taskController);
}());
