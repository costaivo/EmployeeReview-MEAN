(function(){
	function registration($scope, authentication, location){
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
             		$scope.errorMessage="Passwords do not match"

                 }
                else
                 {  
             		$scope.errorMessage="";

                    authentication.register(credentials)
                    .error(function(err){
                        console.log("error" + err.message);
                        if (err.message === "UserName Not available")
                        {
                            $scope.usernameErrorMessage = err.message;
                        }
                    })
                    .success(function(data){
                        console.log("success" + JSON.stringify(data));
                        $location.path('profile');  
                    });
                 }
             }
		
		
	};
	registration.$inject = ['$scope', 'authentication','$location'];
	angular.module("employeeApp").controller("registrationController",registration);
}());