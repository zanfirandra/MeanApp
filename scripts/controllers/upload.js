'use strict';

/**
 * @ngdoc function
 * @name meanapp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the meanapp*/
 
angular.module('meanapp')

  .controller('UploadCtrl', function ($scope, $http, $window, $mdToast, AuthTokenFactory) {
    var token = AuthTokenFactory.getToken();
    console.log(token);
    var config = {
    headers:{ 'Authorization':  'Bearer ' + token} 
    };

    $http.post('/upload',undefined, config).then(
        function(response){
            console.log(response);
        
            if(response.data.success == true){
                $scope.message = response.data.message;
                $('.options').css('visibility', 'hidden');
                $('.logout').css('visibility', 'visible');
                
            }
            else {
                
                AuthTokenFactory.removeToken(); //remove token from localStorage
                $mdToast.show(
                $mdToast.simple()
                    .textContent( response.data.message + ' Redirecting to authentification page!')
                    .toastClass('errorAuth')
                    .parent(document.querySelectorAll('#toaster'))
                    .position('top right')
                    .hideDelay(3000)
                ).then(
                    function(response){
                        console.log('Toast promise: ' + response)
                        $window.location.href = "/login"; //redirect to login
                    });
            }
            
        },
        function(error){
             $window.location.href = "/";
        })
    
    $(document).on('click',".logout", function() {
        $('.options').css('visibility', 'visible');
        $('.logout').css('visibility', 'hidden');
        AuthTokenFactory.removeToken(); //remove token from localStorage
    });


  })

