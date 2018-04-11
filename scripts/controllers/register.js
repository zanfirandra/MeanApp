
'use strict';
/*
*
 * @ngdoc function
 * @name meanapp.controller:RegisterCtrl
*/
 
angular.module('meanapp')
  .controller('RegisterCtrl', function ($scope, $http) {  //$http request. asem ajax
    
    //function to reset form after submit
    $scope.reset = function(original){
        $scope.permission= angular.copy(original)
        $scope.form2.$setPristine();
        $scope.form2.$setUntouched();
    }
 	
    $scope.registerUser = function() {
         var user = {
            'username': $scope.username,
            'password': $scope.password
        }
        
    $http.post("/register", user).then(
        function(response){
            console.log('success');
            var original = $scope.permission;
            $scope.reset(original);
        },
        function(response){
            console.log('fail');
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

