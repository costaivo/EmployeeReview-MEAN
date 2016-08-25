(function(){

	function authentication($http, $window){

	var login = function(user){
		return $http.post('http://localhost:3000/user',user).success(function(data){
			console.log('login: ');
			console.log(data);
			});
		};




		
	};
	authentication.$inject = ['$http', '$window'];
	angular.module("employeeApp").service('authentication',authentication);
}());