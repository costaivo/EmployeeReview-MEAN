(function(){

	function authentication($http, $window){

		var login = function(user){
			return $http.post('http://localhost:9000/user',user).success(function(data){
				//console.log("login Sucessfull");
				});
		};


		var register = function(userDetails){
			return $http.post('http://localhost:9000/user/register',userDetails).success(function(data){
				console.log("registration Sucessfull");
				});
		};
		


	return {
      		login : login,
      		register : register
  		}
	};
	authentication.$inject = ['$http', '$window'];
	angular.module("employeeApp").service('authentication',authentication);
}());