/**
 * Created by liufeng on 16/3/27.
 */
LFApp.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'view/home.html',
            controller:'homeCtrl',
            reloadOnSearch:true,/*默认为true，当$location.search()发生变化时会重新加载路由，如果设置为false，那么url中的查询串‘部分’发生变化时就不会重新加载路由，这个方法对路由嵌套和原地分页需求非常有用*/
            resolve:{
                /*设置了resolve属性，angular会将列表中的元素都注入到控制器中，如果这些依赖是promise对象，在$routeChangeSuccess被触发之前，会被resolve设置成一个值*/
                /*下面得键是会被注入到控制器中的依赖的名字*/
                'UserName':function(sessionService){
                    return sessionService.get('username');
                },
                'ModelData':['$http',function($http){
                    return $http.get('/api').then(function(response){
                    }),function(reason){
                    }
                }]
            }
        })
        .when('/home/:name',{
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