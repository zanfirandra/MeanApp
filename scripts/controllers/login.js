'use strict';

/**
 * @ngdoc function
 * @name meanapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the meanapp
 */
angular.module('meanapp')
  .controller('LoginCtrl', function ($scope, $http) {
 	
    $scope.loginUser = function(){
        var user = {
            'username': $scope.username,
            'password': $scope.password
        }
        
        $http.post("/login",user).then(
            function(response){
                console.log(response)
            },
            function(response){
                alert('Oops! Something went wrong! Please try again!');
            }
        )
    }

   
  });