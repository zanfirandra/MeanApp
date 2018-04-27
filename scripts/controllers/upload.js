'use strict';

/**
 * @ngdoc function
 * @name meanapp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the meanapp*/
 
angular.module('meanapp')
  .controller('UploadCtrl', function ($scope, $http) {

    $http.get('/upload').then(function(response){
        console.log(response);
    })
  })

.run(
        function run($location,$http){
            // keep user logged in after page refresh
            if (localStorage.getItem('token')) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token');
                }
        }
    );