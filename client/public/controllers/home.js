(function(){
	function home($scope){
		$scope.message = "Welcome";
	};
	home.$inject = ['$scope'];
	angular.module("employeeApp").controller("home",home);
	home.$inject = ['$scope'];
}());