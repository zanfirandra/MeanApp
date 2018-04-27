
'use strict';
/*
*
 * @ngdoc function
 * @name meanapp.controller:RegisterCtrl
*/
 
angular.module('meanapp')
  .controller('RegisterCtrl', function ($scope, $http, $window) {  //$http request. asem ajax
 	
    $scope.registerUser = function() {
         var user = {
            'username': $scope.username,
            'password': $scope.password
        }
        
        $http.post("/register", user).then(
            function(response){ //success
                if(response.data.indexOf("errorCreateUser") >= 0){
                    var getResponse = response.data.split(":");
                    $scope.alertCreateUser = getResponse[1];
                    return false; //show error for user to try again to register
                } else
                    return true; //redirect to user's account
                /*else if(response.data.indexOf("successCreateUser") >= 0){ 
                    var getResponse = response.data.split(":");
                    $scope.alertCreateUser = getResponse[1];
                    return true;
                }*/
            },
            function(response){ //fail
                alert('Oops! Something went wrong! Please try again!');
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
   
  })

  .directive("pwCheck", function() {
        return {
            require: 'ngModel',
                link: function (scope, elm, attrs, ngModel) {
                    ngModel.$validators.noMatch = function (value) {
                        // Return true if either of the passwords have not been provided yet
                        if (!attrs.pwCheck || !value) {
                            return true;
                        }

                        return value === attrs.pwCheck;
                    }
                }
        };
    });

