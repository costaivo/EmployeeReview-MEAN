(function() {

    function authentication($http, $window) {

        var saveToken = function(token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function() {
            return $window.localStorage['mean-token'];
        };

        var login = function(user) {
            return $http.post('http://localhost:9000/user', user).success(function(data) {
                saveToken(data.token);
            });
        };

        logout = function() {
            return $window.localStorage.removeItem('mean-token');
        };

        var register = function(userDetails) {
            return $http.post('http://localhost:9000/user/register', userDetails).success(function(data) {
                console.log("registration Sucessfull");
            });
        };

        var updateProfile = function(userDetails) {
            return $http.post('http://localhost:9000/user/updateProfile', userDetails).success(function(data) {
                console.log("user profile updated Sucessfull");
            });
        };


        var getProfile = function() {
            return $http.get('http://localhost:9000/user/profile', {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            });
        };


        return {
            login: login,
            register: register,
            updateProfile: updateProfile,
            getProfile: getProfile,
            getToken: getToken,
            saveToken: saveToken,
            logout: logout
        }
    };
    authentication.$inject = ['$http', '$window'];
    angular.module("employeeApp").service('authentication', authentication);
}());
