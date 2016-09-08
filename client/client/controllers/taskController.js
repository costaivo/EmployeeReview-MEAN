/*
Description : This controller is to display tasks, comments and add comments.
Author : Nikhil U

*/
(function() {
    function taskController($scope, project) {
        $scope.getProjects = function() {
            project.getAllProjects()
                .success(function(data) {
                    $scope.projects = data.projects;
                })
                .error(function(error) {
                    console.log(error);
                });
        };

        $scope.getTaskDetails = function() {
            var projectId = $scope.projectId;
            project.getTaskDetails(projectId)
                .success(function(data) {

                    $scope.tasks = data.tasks;
                    console.log(data);
                })
                .error(function(error) {
                    console.log(error);
                });
        };

        $scope.addTask = function() {

            var taskDetails = {
                taskName: $scope.taskName,
                description: $scope.description,
                userRating: $scope.rating,
                projectId: $scope.projectId
            };
            if (!$scope.rating)
                taskDetails.rating = "0";
            console.log(taskDetails);
        };

    };
    taskController.$inject = ['$scope', 'project'];
    angular.module("employeeApp").controller("taskController", taskController);
}());
