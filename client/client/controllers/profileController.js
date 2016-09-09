/*
Description : This controller is to get and update user's profile data.
Author : Darshani S

*/

(function() {


    function profileController($scope, $rootScope, authentication, constants, user, fileUpload) {
        $scope.myFile = null;

        var vm = this;
        var userdata = "";
        var userSkillsArray = '';
        var userProfilePic = '';
        $scope.availableSkillArray = [];

        $scope.loadProfileData = function() {

            authentication.getProfile()
                .success(function(data) {

                    console.log("data " + JSON.stringify(data));

                    userdata = data.user;

                    //Process the Skills data
                    if (userdata.skills) {
                        userSkillsArray = userdata.skills;
                        vm.userSkillArray = userSkillsArray.split(",");
                    }
                    if (userdata.profilePic) {
                        userProfilePic = constants.baseUrl + constants.port + userdata.profilePic;
                    } else {
                        userProfilePic = constants.baseUrl + constants.port + constants.blankAvatar;
                    }

                    $scope.firstName = userdata.firstName;

                    $scope.user = {
                        "userName": userdata.userName,
                        "firstName": userdata.firstName,
                        "middleName": userdata.middleName,
                        "lastName": userdata.lastName,
                        "dateOfBirth": userdata.dateOfBirth,
                        "dateOfJoining": userdata.dateOfJoining,
                        "designation": userdata.designation,
                        "team": userdata.team,
                        "skills": "",
                        "rating": userdata.rating,
                        "profilePic": userProfilePic
                    };
                });
        }



        $scope.uploadFile = function() {
            var file = $scope.myFile;

            if (file != undefined) {
                var uploadUrl = constants.baseUrl + constants.port + '/user/addPicture';
                var fileUploadURL = fileUpload.uploadFileToUrl(file, uploadUrl);

                console.log("fileUploadURL " + fileUploadURL);
            }

            console.log('file is ' + file);
            console.log('');


        };


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

        vm.availableSkillsArray = $scope.availableSkillArray;



        //update user profile details
        $scope.updateUserProfile = function() {

            var userData = $scope.user;
            if (vm.userSkillArray != undefined) {
                userData.skills = vm.userSkillArray.join(',');
            }
            console.log("userData " + JSON.stringify(userData));
            authentication.updateProfile(userData)
                .error(function(error) {
                    console.log("error " + JSON.stringify(error));
                })
                .then(function(data) {
                    console.log(" data " + JSON.stringify(data));

                });
        }


        $('#birthDate').datepicker({
            format: constants.dateFormat
        });



        $scope.addSkill = function() {
            var skill = {
                "skill": $scope.skills
            }
            console.log(skill);
            user.addSkill(skill)
                .error(function(error) {
                    console.log("error " + JSON.stringify(error));
                    $scope.skillAlreadyExists = constants.msgSkillAlreadyExist;
                })
                .then(function(response) {
                    console.log("newly added skill " + JSON.stringify(response));
                });
        }


    };

    profileController.$inject = ['$scope', '$rootScope', 'authentication', 'constants', 'user', 'fileUpload'];
    angular
        .module("employeeApp")
        .controller("profileController", profileController)
}());
