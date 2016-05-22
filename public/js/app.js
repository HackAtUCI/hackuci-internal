var hackuci = angular.module('hackuci', ['ngRoute', 'angular.filter', 'ui.materialize', 'ngCookies']);

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


hackuci.controller('mainController', function($scope, $http, $cookies, $window) {
    $scope.$on('$locationChangeStart', function(event) {
        var cookie = $cookies.get('ucnetid_auth')
        $http.post('/auth/check', {token: cookie}).then(
            function onSuccess(response) {
                if(response.status === 401) {
                    console.log('mada');
                }
            },
            function onError(err) {
                if (err.status === 401){
                    $window.location.href = '/auth/redirect'
                }
            }
        );

    });
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


    $scope.walkin = function() {

    };

});
