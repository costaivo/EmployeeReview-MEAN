/*
Description : This controller is to display tasks, comments and add comments.
Author : Nikhil U

*/
(function() {
    function taskController($scope) {
        $scope.projects = [
            { project: "", projectId: "0" },
            { project: "Project 1", projectId: "1" },
            { project: "Project 2", projectId: "2" },
            { project: "Project 3", projectId: "3" }
        ];

    };
    taskController.$inject = ['$scope'];
    angular.module("employeeApp").controller("taskController", taskController);
}());
