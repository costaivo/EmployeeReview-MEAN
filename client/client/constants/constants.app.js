/*
Description : Add Angular related constants here
	DO NOT ADD node/express related cconstants here
	Do not add any code or functions here

Author : Nikhil U
*/


var constants = {
    port: 9000,
    baseUrl: 'http://localhost:',
    blankAvatar: '/images/users/newUser/Avatar-Blank.gif',
    dateFormat: 'mm-dd-yyyy',
    msgUsernamePasswordFailure: 'Incorrect username or password!',
    msgPasswordMatchFailure: 'Passwords do not match!',
    msgUsernameRegisterFailure: 'Username is already registered! Please choose different Username.',
    msgUserRegisteredSuccess: 'User registered successfully!',
    msgSkillAlreadyExist: 'Skill already exists!',
    msgSkillAddedSuccessfully: 'Skill successfully added!',
    msgUserProfileUpdateSuccess: 'User profile successfully updated!',
    msgUserProfileUpdateFailure: 'Error updating user profile. Try again!'

};
angular.module('employeeApp').constant('constants', constants);
