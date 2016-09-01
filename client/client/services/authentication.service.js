(function() {

    function authentication($http, $window, constants) {

        var saveToken = function(token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function() {
            return $window.localStorage['mean-token'];
        };

        var login = function(user) {
            return $http.post(constants.baseUrl + constants.port + '/user', user).success(function(data) {
                saveToken(data.token);
            });
        };

        logout = function() {
            return $window.localStorage.removeItem('mean-token');
        };

        var register = function(userDetails) {
            return $http.post(constants.baseUrl + constants.port + '/user/register', userDetails).success(function(data) {
                console.log("registration Sucessfull");
            });
        };

        var updateProfile = function(userDetails) {
            return $http.post(constants.baseUrl + constants.port + '/user/updateProfile', userDetails, {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            }).success(function(data) {
                console.log("user profile updated Sucessfull");
            });
        };


        var getProfile = function() {
            return $http.get(constants.baseUrl + constants.port + '/user/profile', {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            });
        };

        var resetUserPasswordEmail = function(userName) {
            var userNameJson = '{"userName": "' + userName + '"}';
            return $http.post(constants.baseUrl + constants.port + '/user/forgotPassword', userNameJson).success(function(data) {});
        };


        return {
            login: login,
            register: register,
            updateProfile: updateProfile,
            getProfile: getProfile,
            getToken: getToken,
            saveToken: saveToken,
            logout: logout,
            resetUserPasswordEmail: resetUserPasswordEmail
        }
    };
    authentication.$inject = ['$http', '$window', 'constants'];
    angular.module("employeeApp").service('authentication', authentication);
}());
