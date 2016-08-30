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
		
		var updateProfile = function(userDetails){
			return $http.post('http://localhost:9000/user/updateProfile',userDetails).success(function(data){
				console.log("user profile updated Sucessfull");
				});
		};


		var getProfile = function(email){
			return $http.get('http://localhost:9000/user/'+ email);
		};


	return {
      		login : login,
      		register : register,
      		updateProfile : updateProfile,
      		getProfile : getProfile
  		}
	};
	authentication.$inject = ['$http', '$window'];
	angular.module("employeeApp").service('authentication',authentication);
}());