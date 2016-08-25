(function(){
	function loginController($scope, authentication ){

		$scope.login=function(){
			//take credentials
			//add a service called authentication that will do http post(user)
			authentication.login($scope.credentials)
				.error(function(err){
					console.log(err);
				})
				.then(function(){
					console.log('redirect to :');
				});
		};
		
	};
	loginController.$inject = ['$scope','authentication'];
	angular.module("employeeApp").controller("loginController",loginController);
}());