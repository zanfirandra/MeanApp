'use strict';

/**
 * @ngdoc function
 * @name meanapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the meanapp
 $http - service
 */
angular.module('meanapp'/*,['meanapp.factory']*/)

  .controller('LoginCtrl', function ($scope, $http, $window,$location,$state, AuthTokenFactory) {
 	
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
                        AuthTokenFactory.setToken(response.data.token); //factory

                        //$location.path("/upload");
                        $window.location.href = "/upload";
                         /*var token = AuthTokenFactory.getToken();
                         var config = {
                         headers:{ 'Authorization':  'Bearer ' + token} 
                         };

                         $http.post('/upload',undefined, config).then(
                         function(response){
                             if(response.status == 200){
                                 $window.location.href = "/upload";
                             } else {
                                 $scope.alertLoginUser = "Unable to login! Please use personal data"
                             }
                         });*/
                        
                    }
                    
                }
            },
            function(error) {
                $scope.alertLoginUser = 'Oops! Something\'s wrong! Please, try again!';
            });
    }
  })