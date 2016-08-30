//constants for angular

var constants = {
    port: 3000,
    dateFormat: 'mm-dd-yy',
    msgUsernamePasswordFailure: 'Incorrect username or password!',
    msgPasswordMatchFailure: 'Incorrect password match!',
    msgUsernameRegisterFailure: 'Username is already registered! Please choose different Username.'

};
angular.module('employeeApp').constant('constants', constants);
