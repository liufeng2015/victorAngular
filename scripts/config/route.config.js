/**
 * Created by liufeng on 16/3/27.
 */
LFApp.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'view/home.html',
            controller:'homeCtrl'
        })
        .when('/login',{
            templateUrl:'view/login.html',
            controller:'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);