var hackuci = angular.module('hackuci', ['ngRoute']);

hackuci.config(
    function($routeProvider) {
        $routeProvider

            //home page
            .when('/', {
                templateUrl : 'views/home.html',
                controller  : 'mainController'
            })

            //registration route
            .when('/register', {
                templateUrl : 'views/register.html',
                controller  : 'mainController'
            });
    }



)


hackuci.controller('mainController', function($scope) {

})
