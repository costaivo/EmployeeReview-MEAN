(function() {

    function fileUpload($http, $window, constants) {


        uploadFileToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);
            $http.put(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined , 'Authorization': 'Bearer '+ $window.localStorage['mean-token']}
            })
            .success(function(data){
                console.log( "success data " + data.image);
                return data.image;
            })
            .error(function(){
            });
        }


        return {
            uploadFileToUrl: uploadFileToUrl
        };
    };


    fileUpload.$inject = ['$http', '$window', 'constants'];
    angular.module("employeeApp").service('fileUpload', fileUpload);
}());
