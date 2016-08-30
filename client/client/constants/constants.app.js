/*
Description : Add Angular related constants here
	DO NOT ADD node/express related cconstants here
	Do not add any code or functions here

Author : Nikhil U
*/


var constants = {
    port: 3000,
    dateFormat: 'mm-dd-yy',
    msgUsernamePasswordFailure: 'Incorrect username or password!',
    msgPasswordMatchFailure: 'Incorrect password match!',
    msgUsernameRegisterFailure: 'Username is already registered! Please choose different Username.'

};
angular.module('employeeApp').constant('constants', constants);

