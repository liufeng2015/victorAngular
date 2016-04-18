/**
 * Created by liufeng on 16/3/27.
 */
LFApp.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'view/home.html',
            controller:'homeCtrl',
            resolve:{
                'user':function(){

                }
            }
        })
        .when('/home',{
            templateUrl:'view/login.html',
            controller:'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);