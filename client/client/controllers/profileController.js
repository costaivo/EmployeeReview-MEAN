/*
Description : This controller is to get and update user's profile data.
Author : Darshani S

*/

(function(){
	function profileController($scope, $rootScope, authentication, constants){

		authentication.getProfile()
		.success(function(data)
		{
			console.log("data " + JSON.stringify(data));
			var userdata = data.user;
			$scope.user={ 
			    "username" : userdata.username, 			    
			    "firstName" : userdata.firstName, 
			    "middleName" : userdata.middleName, 
			    "lastName" : userdata.lastName, 
			    "dateOfBirth" : userdata.dateOfBirth, 
			    "dateOfJoining" : userdata.dateOfJoining, 
			    "designation" : userdata.designation, 
			    "team" : userdata.team, 
			    "skills" : userdata.skills, 
			    "rating" : userdata.rating
			};
		});



        //update user profile details
        $scope.updateUserProfile = function()
        {        
 
 			var user= $scope.user;
 			console.log(user);
            authentication.updateProfile(user)          
            .error(function(err) {
                console.log("error " + JSON.stringify(err));
            })
            .then(function(data) {                    
                console.log(" data " + JSON.stringify(data));

            });

            
        }




        $(function () {
            $("#birthDate").datepicker({
                dateFormat : constants.dateFormat
            });
        });	


        $(function () {
            $("#joiningDate").datepicker({
                dateFormat: constants.dateFormat
            });
        });	

	};

	profileController.$inject=['$scope', '$rootScope', 'authentication', 'constants'];
	angular
		.module("employeeApp")
		.controller("profileController",profileController)
	    .directive("datepicker", function () {
		    return {
		        restrict: "A",
		        link: function (scope, el, attr) {
		            el.datepicker({
		                            dateFormat: constants.dateFormat
		                        });
		        }
		    };
		});
}());