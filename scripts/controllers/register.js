
'use strict';
/*
*
 * @ngdoc function
 * @name meanapp.controller:RegisterCtrl
*/
 
angular.module('meanapp')
  .controller('RegisterCtrl', function ($scope, $http) {  //$http request. asem ajax
 	
    $scope.registerUser = function() {
         var user = {
            'username': $scope.username,
            'password': $scope.password
        }
        
    $http.post("/register", user).then(
        function(response){
            if(response.data.indexOf("errorCreateUser") >= 0){
                var getResponse = response.data.split(":");
                $scope.alertCreateUser = getResponse[1];
            } else if(response.data.indexOf("successCreateUser") >= 0){ 
                var getResponse = response.data.split(":");
                $scope.alertCreateUser = getResponse[1];
            }
        },
        function(response){
            alert('Oops! Something went wrong! Please try again!');
        }
    );
    
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

