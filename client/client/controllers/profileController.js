(function(){
	function profileController($scope,$rootScope){
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




        $(function () {
            $("#birthDate").datepicker({
                dateFormat: 'mm-dd-yy'
            });
        });	


        $(function () {
            $("#joiningDate").datepicker({
                dateFormat: 'mm-dd-yy'
            });
        });	

	};

	profileController.$inject=['$scope','$rootScope'];
	angular
		.module("employeeApp")
		.controller("profileController",profileController)
	    .directive("datepicker", function () {
		    return {
		        restrict: "A",
		        link: function (scope, el, attr) {
		            el.datepicker({
		                            dateFormat: 'mm-dd-yy'
		                        });
		        }
		    };
		});
}());