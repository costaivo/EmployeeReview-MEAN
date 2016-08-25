(function(){
	function login($scope ){

		$scope.login=function(){
			//take credentials
			//add a service called authentication that will do http post(user)
		};
		
	};
	login.$inject = ['$scope'];
	angular.module("employeeApp").controller("login",login);
}());