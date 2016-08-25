(function(){
	function profile($scope){
		$scope.user={ 
			    "_id" : "57a47403ae94ef0614d883a9", 
			    "username" : "abc@d.com", 
			    "password" : "aaa", 
			    "firstName" : "Aaa", 
			    "middleName" : "Bbb", 
			    "lastName" : "Ccc", 
			    "dateOfBirth" : "2000-01-01", 
			    "dateOfJoining" : "2016-01-01", 
			    "designation" : "junior developer", 
			    "team" : "MEAN stack", 
			    "skills" : "C/C++,NodeJS,HTML", 
			    "rating" : "3"
			};
	};
	profile.$inject=['$scope'];
	angular.module("employeeApp").controller("profile",profile);
}());