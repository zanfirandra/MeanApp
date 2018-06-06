var appService = angular.module('meanapp.service',[]);


//check if user is logged in 
appService.service('AuthService',function($window){
    /* return{
       isLoggedIn:isLoggedIn
     };*/
     this.isLoggedIn = function(){
       if($window.localStorage.getItem('loggedIn')){
         return true;
       }else{
         console.log("User is not logged in");
         return false;
       }
     }
});

appService.service('AuthInterceptor', function(){
    var service = this;
    
    service.request = function(config){
        config.headers.Authorization = $window.localStorage.getItem('token');
        return config;
    }
});