(function(){
	function registrationController($scope, authentication, $location){
		$scope.button = true;


		$scope.register=function() 
             {
                var password1=$scope.credentials.password;
                var password2=$scope.credentials.confirmPassword;
                var credentials = $scope.credentials;
                console.log("checking password");

                 if(password1!=password2)
                 {  
                    console.log("{{ errorMessage }}");                 	
             		$scope.errorMessage="Incorrect password match"

                 }
                else
                 {  
             		$scope.errorMessage="";

                    authentication.register(credentials)
                    .error(function(err){
                        console.log("error" + err.message);
                            $scope.usernameErrorMessage = err.message;

                    })
                    .success(function(data){
                        console.log("success" + JSON.stringify(data));
                        $location.path('profile');  
                    });
                 }
             }
		
		
	};
	registrationController.$inject = ['$scope', 'authentication','$location'];
	angular.module("employeeApp").controller("registrationController",registrationController);
}());