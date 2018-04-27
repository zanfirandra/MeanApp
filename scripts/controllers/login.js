'use strict';

/**
 * @ngdoc function
 * @name meanapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the meanapp
 */
angular.module('meanapp')
  .controller('LoginCtrl', function ($scope, $http, $window,$location) {
 	
    $scope.loginUser = function(){
        var user = {
            'username': $scope.username,
            'password': $scope.password
        }
        
        $http.post("/login",user).then(
            function(response){
                if( typeof response.data != 'object'){
                    if(response.data.indexOf("errorLoginUser") >= 0){
                        var getResponse = response.data.split(":");
                        $scope.alertLoginUser = getResponse[1];
                    } 
                } else {
                    if(response.data.token){
                        console.log($http.defaults.headers);
                        localStorage.setItem('token',response.data.token);
                        //console.log($http.defaults.headers);
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                        //console.log($http.defaults.headers);
                        //$location.path('/upload');
                        $http({
                          method: 'GET',
                          url: '/upload'
                        }).then(function successCallback(response) {
                            console.log(response);
                            // this callback will be called asynchronously
                            // when the response is available
                          }, function errorCallback(response) {
                            console.log(response);
                            // called asynchronously if an error occurs
                            // or server returns response with an error status.
                          });
                    }
                }
                
            }
        )/*.then( function(response){
            if(response === true){
                //var host = $window.location.host;
                //var protocol = $window.location.protocol;
                var pathToLogin = "/upload"
                $window.location.href = pathToLogin;
            }
        });*/
    }

   
  });