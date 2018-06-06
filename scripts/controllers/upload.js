'use strict';

/**
 * @ngdoc function
 * @name meanapp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the meanapp*/
 
angular.module('meanapp')

  .controller('UploadCtrl', function ($scope, $http, AuthTokenFactory) {
    var token = AuthTokenFactory.getToken();
    var config = {
    headers:{ 'Authorization':  'Bearer ' + token} 
    };

   /* $http.post('/upload', undefined, config).then(
    function(response){
    console.log(response);
    });*/
    

  })

