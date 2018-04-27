'use strict';

/**
 * @ngdoc overview
 * @name meanapp
 * @description
 * # meanapp
 *https://coursework.vschool.io/ngroute-without-hash-html5-mode/ 
 *https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
 * Main module of the application.
 */
angular
  .module('meanapp',['ngRoute', 'ngMessages','ngMaterial','angular-jwt'])
  .config(["$routeProvider", "$locationProvider", "jwtInterceptorProvider","$httpProvider", function ($routeProvider, $locationProvider, jwtInterceptorProvider,$httpProvider) {
    $locationProvider.html5Mode(true);
      
    jwtInterceptorProvider.tokenGetter = function(){
        return localStorage.getItem('jwt'); //getting the jwt from localStorage
    }
    
    $httpProvider.interceptors.push('jwtInterceptor');
    
    $routeProvider
     .when('/', {
        templateUrl: "/views/404.html",
      })
      .when('/index', {
        templateUrl: '/views/main.html',  /*i se asigneaza ng-view-ului*/
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      });
      /*.otherwise({
        controller : function(){
        window.location.replace('/');
        }, 
        template : "<div></div>"
      });*/
    
    
  }])
    .run(
        function run($location,$http){
            // keep user logged in after page refresh
            if (localStorage.getItem('token')) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('token');
                }
        }
    );
 /*   .config(function Config($httpProvider, jwtOptionsProvider) {
    // Please note we're annotating the function so that the $injector works when the file is minified
    jwtOptionsProvider.config({
      tokenGetter: ['jwtHelper', '$http', function(jwtHelper, $http) {
        //myService.doSomething();
        return localStorage.getItem('id_token');
      }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
  })
 */