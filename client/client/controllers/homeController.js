(function(){
	function home($scope){
		$scope.message = "Welcome";
	};
	home.$inject = ['$scope'];
	angular.module("employeeApp").controller("homeController",home);
	home.$inject = ['$scope'];
}());