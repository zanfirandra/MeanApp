'use strict';

/**
 * @ngdoc function
 * @name meanapp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the meanapp
 */
angular.module('meanapp')
  .controller('LoginCtrl', function ($scope, $http, $window) {
 	
    $scope.loginUser = function(){
        var user = {
            'username': $scope.username,
            'password': $scope.password
        }
        
        $http.post("/login",user).then(
            function(response){
                if(response.data.indexOf("errorLoginUser") >= 0){
                    var getResponse = response.data.split(":");
                    $scope.alertLoginUser = getResponse[1];
                } else 
                    return true;
            }
        ).then( function(response){
            if(response === true){
                //var host = $window.location.host;
                //var protocol = $window.location.protocol;
                var pathToLogin = "/upload"
                $window.location.href = pathToLogin;
            }
        });
    }

   
  });