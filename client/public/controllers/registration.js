(function(){
	function registration($scope){
		$scope.button = true;
		$scope.checkPasswordMatch=function() 
             {
                var password1=document.getElementById('password').value;
                var password2=document.getElementById('confirmpassword').value;
                console.log("checking password");

                 if(password1!=password2)
                 {  console.log("{{ errorMessage }}");
                 	//document.getElementById('errormessage').innerHTML="Passwords do not match";
             		$scope.errorMessage="Passwords do not match"
             		$scope.button = true;
                 	return false;
                 }
                else
                 {  console.log("success"); 
             		$scope.errorMessage="";
             		$scope.button = false;
                 	//document.getElementById('errormessage').innerHTML="Passwords match!";
                      return true;
                 }
             }
		
		
	};
	registration.$inject = ['$scope'];
	angular.module("employeeApp").controller("registration",registration);
}());