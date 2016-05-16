/**
 * Created by zzjz-pc15 on 2016/4/20.
 */
LFApp.config(['$locationProvider',function($locationProvider){
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
}]);