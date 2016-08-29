(function(){

	function authentication($http, $window){

		var login = function(user){
			return $http.post('http://localhost:9000/user',user).success(function(data){
				//console.log("login Sucessfull");
				});
		};


		


	return {
      		login : login
  		}	
	};
	authentication.$inject = ['$http', '$window'];
	angular.module("employeeApp").service('authentication',authentication);
}());