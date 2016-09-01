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
                    "userName": userdata.userName,
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



        $scope.availableSkillArray = [];
        user.getSkills()
            .error(function(error) {
                console.log("error " + JSON.stringify(error));
            })
            .then(function(response) {


                var availableSkills = response.data.skills;

                if (availableSkills.length > 0) {
                    for (var i = 0; i < availableSkills.length; i++) {
                        $scope.availableSkillArray.push(availableSkills[i].skill);
                    }
                }
            });

        this.availableSkillsArray = $scope.availableSkillArray;
        this.userSkillArray = ['JAVA'];
        
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
