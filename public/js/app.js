var hackuci = angular.module('hackuci', ['ngRoute', 'angular.filter', 'ui.materialize']);

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
                controller  : 'registerController'
            });
    }



)


hackuci.controller('mainController', function($scope) {
});

hackuci.controller('registerController', function($scope, $http) {
    $http.get('/register').then(
        function onSuccess(response){
            $scope.registerData = response.data;
        });

    $scope.getEntryInfo = function(email) {
        $http.post('/register', {email: email}).then(
            function onSuccess(response) {
                $scope.userView = response.data;
                $('#register-modal').openModal();
            });
    };

    $scope.checkinUser = function(email) {
        $http.post('/register/checkin', {email: email}).then(
            function onSuccess(response) {
                Materialize.toast($scope.userView.fname + ' was signed in!', 4000)
            },
            function onError(err) {
            }
        );
    };
});
