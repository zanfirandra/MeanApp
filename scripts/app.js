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
  .module('meanapp',['ngRoute', 'ngMessages','ngMaterial'])
  .config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
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

