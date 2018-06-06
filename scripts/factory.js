//data from factory 1 passed through factory 2

var appFactory=angular.module('meanapp.factory',[]);

appFactory.factory('AuthTokenFactory', function AuthTokenFactory($window) {

  var store = $window.localStorage;
  var key = 'token';

//setteri si getteri pentru token
    
var factory = {};

   factory.getToken = function() {
    return store.getItem(key);
  }

  factory.setToken = function(token) {
    if (token) {
      store.setItem(key, token);
    } else {
      store.removeItem(key);
    }
  }
  
  factory.removeToken = function(token){
      store.removeItem(key);
  }
  
  return factory;
});

appFactory.factory('AuthInterceptor', [ '$q','$window', '$location', 'AuthTokenFactory', function($q, $window, $location, AuthTokenFactory) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        var token = AuthTokenFactory.getToken();
        if( token && !config.headers.Authorization) {
            config.headers.Authorization = 'Bearer ' + token;
           // $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(rejection) {
        if (rejection != null && rejection.status === 401) {
          AuthTokenFactory.removeToken();
          $location.url("/login");
        }

        return $q.reject(rejection);
      }
    };
}]);