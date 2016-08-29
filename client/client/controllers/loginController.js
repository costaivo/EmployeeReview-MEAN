(function(){
	function loginController($scope, $rootScope, authentication ,$location){

		$scope.login=function(){
			//take credentials
			//add a service called authentication that will do http post(user)
			
			authentication.login($scope.credentials)
				.error(function(err){
					console.log(err.message);
					$scope.errorMessage=err.message;
				})
				.then(function(data){
					$scope.errorMessage="";
						//show profile page	
						$rootScope.user=data.data.user;
						$location.path('profile');				
				});
		};
		
	};
	loginController.$inject = ['$scope','$rootScope','authentication','$location'];
	angular.module("employeeApp").controller("loginController",loginController);
}());