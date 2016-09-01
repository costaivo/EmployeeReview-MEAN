/*
Description : This controller is to get and update user's profile data.
Author : Darshani S

*/

(function() {
    function profileController($scope, $rootScope, authentication, constants, user) {

        authentication.getProfile()
            .success(function(data) {
                console.log("data " + JSON.stringify(data));
                var userdata = data.user;
                $scope.user = {
                    "username": userdata.username,
                    "firstName": userdata.firstName,
                    "middleName": userdata.middleName,
                    "lastName": userdata.lastName,
                    "dateOfBirth": userdata.dateOfBirth,
                    "dateOfJoining": userdata.dateOfJoining,
                    "designation": userdata.designation,
                    "team": userdata.team,
                    "skills": userdata.skills,
                    "rating": userdata.rating
                };
            });



        //update user profile details
        $scope.updateUserProfile = function() {

            var userData = $scope.user;
            console.log(userData);
            authentication.updateProfile(userData)
                .error(function(error) {
                    console.log("error " + JSON.stringify(error));
                })
                .then(function(data) {
                    console.log(" data " + JSON.stringify(data));

                });
        }


        $(function() {
            $("#birthDate").datepicker({
                dateFormat: constants.dateFormat
            });
        });


        $(function() {
            $("#joiningDate").datepicker({
                dateFormat: constants.dateFormat
            });
        });



        user.getSkills()
            .error(function(error) {
                console.log("error " + JSON.stringify(error));
            })
            .then(function(response) {
                $scope.availableSkillArray = [];

                $scope.availableSkills = response.data.skills;

				if ($scope.availableSkills.length > 0) 
                {
                    for (var i = 0; i < $scope.availableSkills.length; i++) 
                    {
                        $scope.availableSkillArray.push($scope.availableSkills[i].skill);                 
                    } 
                }

                console.log("data " + JSON.stringify($scope.availableSkillArray));



            });

        $scope.userSkillArray = ['JAVA'];


    };

    profileController.$inject = ['$scope', '$rootScope', 'authentication', 'constants', 'user'];
    angular
        .module("employeeApp")
        .controller("profileController", profileController)
        .directive("datepicker", function() {
            return {
                restrict: "A",
                link: function(scope, el, attr) {
                    el.datepicker({
                        dateFormat: constants.dateFormat
                    });
                }
            };
        });
}());
