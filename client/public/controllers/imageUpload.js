
(function(){
    function imageUploadController($scope ) {

        

        $scope.uploadFile = function(){        

            //$("#fileInput").click();
            //document.getElementById('fileInput').click();
            //var file = $scope.myFile;
            var file = document.getElementById('fileInput').value;
            console.log('file is ' );
            console.log(file);
            if(file != undefined)
            {                
                var uploadUrl ='/public/images/user';
                var fileUploadURL=updateImageToUrl(file, uploadUrl);
                
                console.log("fileUploadURL :" + fileUploadURL);
            }
            else
                console.log("Error");
        }

        var updateImageToUrl = function(file, uploadUrl){
            var fd = new FormData();
            fd.append('file', file);

            // var fs = require('fs');
            
            var sourcePath = file.path;
            var extension = "png"
            var destPath = "/images/users/1."+extension;
            var source = fs.createReadStream(sourcePath);
            var dest = fs.createWriteStream('./public'+destPath);
            source.pipe(dest);
            var images = {
                        profilePic : destPath
                        //thumbnail : "/images/users/"+userId+"/"+userId+"_thumbnail."+extension
                      };
            // $http.put(uploadUrl, fd, {
            //     transformRequest: angular.identity,
            //     headers: {'Content-Type': undefined , 'Authorization': 'Bearer '+ $window.localStorage['mean-token']}
            // })
            // .success(function(data){
            //     console.log( "success data " + data.images.profilePic);
            //     return data.images.profilePic;
            // })
            // .error(function(){
            // });     

            return destPath;       
        }


        
    }
    imageUploadController$inject = ['$scope' ];
    angular.module('employeeApp').controller('imageUploadController',imageUploadController);
}());