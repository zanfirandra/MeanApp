'use strict';

/**
 * @ngdoc function
 * @name meanapp.controller:MainCtrl
 * @description
 * #MainCtrl
 * Controller of the meanapp

 */
angular.module('meanapp')

  .controller('MainCtrl', function ($scope, $http, $mdToast, $window,$location, AuthenticateUserFactory) {
 	
    $scope.loginUser = function(){
        var user = {
            'username': $scope.username,
            'password': $scope.password
        }
        
        $http.post("/index",user).then(
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