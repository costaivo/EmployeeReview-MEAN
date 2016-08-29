(function(){
	function profile($scope,$rootScope){
		// var user={ 
		// 	    "_id" : "57a47403ae94ef0614d883a9", 
		// 	    "username" : "abc@d.com", 
		// 	    "password" : "aaa", 
		// 	    "firstName" : "Aaa", 
		// 	    "middleName" : "Bbb", 
		// 	    "lastName" : "Ccc", 
		// 	    "dateOfBirth" : "2000-01-01", 
		// 	    "dateOfJoining" : "2016-01-01", 
		// 	    "designation" : "junior developer", 
		// 	    "team" : "MEAN stack", 
		// 	    "skills" : "C/C++,NodeJS,HTML", 
		// 	    "rating" : "3"
		// 	};
		// $scope.user=User;

		var user= $rootScope.user;
			console.log(user);
			$scope.firstName="try";
	};
	profile.$inject=['$scope','$rootScope'];
	angular.module("employeeApp").controller("profileController",profile);
}());