'use strict';

/**
 * @ngdoc function
 * @name meanapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the meanapp
 $http - service
 */
angular.module('meanapp')

  .controller('LoginCtrl', function ($scope, $http, $window, AuthenticateUserFactory) {
 	
    $scope.loginUser = function(){
        var user = {
            'username': $scope.username,
            'password': $scope.password
        }
        
        $http.post("/login",user).then(
            /*function(response){
                if( typeof response.data != 'object'){
                    if(response.data.indexOf("errorLoginUser") >= 0){
                        var getResponse = response.data.split(":");
                        $scope.alertLoginUser = getResponse[1];
                        
                    } 
                } else {
                    if(response.data.token){
                        AuthTokenFactory.setToken(response.data.token); //factory
                        $window.location.href = "/upload";
                        
                    }
                    
                }
            }*/
            AuthenticateUserFactory.authenticate,
            
            function(error) {
                $mdToast.show(
                $mdToast.simple()
                    .textContent('Oops! Something\'s wrong! Please, try again!')
                    .toastClass('errorAuth')
                    .parent(document.querySelectorAll('#toaster'))
                    .position('top right')
                    .hideDelay(3000)
                )
            });
    }
  })