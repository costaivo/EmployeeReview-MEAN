/*
Description : This controller is to get and update user's profile data.
Author : Darshani S

*/

(function() {


    function profileController($scope, $rootScope, authentication, constants, user, fileUpload) {

        var vm = this;
        var userdata = "";
        var userSkillsArray = '';
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
                        "rating": userdata.rating
                    };
                });
        }



        $scope.uploadFile = function(){  
            var fu1 = document.getElementById("fileInput");   
            var file = $scope.myFile;
            console.log('file is ' + file);
            console.log('');
            if(file != undefined)
            {                
                var uploadUrl = constants.baseUrl + constants.port + '/user/addPicture';
                var fileUploadURL= fileUpload.uploadFileToUrl(file, uploadUrl);
                
                console.log("fileUploadURL " + fileUploadURL);
            }
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
            userData.skills = vm.userSkillArray.join(',');

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




    };

    profileController.$inject = ['$scope', '$rootScope', 'authentication', 'constants', 'user', 'fileUpload'];
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
