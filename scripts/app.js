'use strict';

/**
 * @ngdoc overview
 * @name meanapp
 * @description
 * # meanapp
 *https://coursework.vschool.io/ngroute-without-hash-html5-mode/ 
 *https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode
 * Main module of the application.
 $httpProvider - provider
 */
angular
  .module('meanapp',['ui.router', 'ngMessages','ngMaterial','angular-jwt', 'meanapp.service', 'meanapp.factory'])
 /* .factory('sessionInterceptor', [ function(){
        var sessionInterceptor = {
            request: function(config){
                var token = localStorage.getItem('token');
                if(token != null){
                   config.headers.authorization = 'Bearer ' + token;
                  // config.url = '/upload'
                }
                return config;
            }
        };
        return sessionInterceptor;
    }])*/

//redirect to login if the user is not loggedIn and is not refer from login page.
 /* .run(function($rootScope,AuthService,$state){
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
         if(toState.authenticate && toState.name !== 'login' && !AuthService.isLoggedIn()){
           event.preventDefault();
           $state.transitionTo('login');
         }
      });
 })*/

  .config(["$stateProvider","$urlRouterProvider", "$locationProvider", "$httpProvider", function ($stateProvider,$urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);
     // $locationProvider.hashPrefix('');
      
   /* jwtInterceptorProvider.tokenGetter = function(){
        return localStorage.getItem('token'); //getting the jwt from localStorage
    } 
    
    $httpProvider.interceptors.push('sessionInterceptor'); */
      
    /*  $httpProvider.interceptors.push( [ '$q', '$location', function ( $q, $location)
    {
        return {
            'request': function ( config )
            {
                config.headers = config.headers || {};
                var token = localStorage.getItem('token');
                if ( token != null) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            'responseError': function ( response )
            {
                if ( response.status === 401 || response.status === 403 )
                {
                    localStorage.setItem('');
                    $location.path( '/login' );
                }
                return $q.reject( response );
            }
        };
    } ] );*/
    
    /*$routeProvider
     .when('/', {
        templateUrl: "/views/404.html",
      })
      .when('/index', {
        templateUrl: '/views/main.html'
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
      .otherwise({
        controller : function(){
        window.location.replace('/');
        }, 
        template : "<div></div>"
      });*/
    
      
    $httpProvider.interceptors.push('AuthInterceptor'); //from factory
      
   /*   $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
           return {
               'request': function (config) {
                   config.headers = config.headers || {};
                   token = localStorage.getItem('token');
                   if (token != null) {
                       config.headers.Authorization = 'Bearer ' + token;
                   }
                   return config;
               },
               'responseError': function (response) {
                   if (response.status === 401 || response.status === 403) {
                       $location.path('/login');
                   }
                   return $q.reject(response);
               }
           };
        }]);*/
      
    
      $urlRouterProvider.otherwise('/');
      
      $stateProvider
          .state('root', {
              url: '/',
              templateUrl: 'views/404.html'
          })
          .state('index', {
              url: '/index',
              templateUrl: 'views/main.html',
              controller: 'MainCtrl'
          })
          .state('register', {
              url: '/register',
              templateUrl: 'views/register.html',
              controller: 'RegisterCtrl'
              })
          .state('login', {
              url: '/login',
              templateUrl: 'views/login.html',
              controller: 'LoginCtrl'
              })
          .state('upload', {
              url: '/upload',
              templateUrl: 'views/upload.html',
              controller: 'UploadCtrl',
              //authenticate: true
              })
    
  }]);