(function() {
    var app = angular.module("employeeApp", ['ngRoute']);
    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'homeController',
                templateUrl: 'views/home.html'
            })
            .when('/home', {
                controller: 'homeController',
                templateUrl: 'views/home.html'
            })
            .when('/login', {
                controller: 'loginController',
                templateUrl: 'views/login.html'
            })
            .when('/registration', {
                controller: 'registrationController',
                templateUrl: 'views/registration.html'
            })

        .when('/profile', {
                controller: 'profileController',
                templateUrl: 'views/profile.html'
            })
            .when('/image', {
                controller: 'imageUpload',
                templateUrl: 'views/imageUpload.html'
            })
            .otherwise({ redirectTo: '/' });
    });
}());
