/**
 * Created by zzjz-pc15 on 2016/4/20.
 */
/*用来注册全局监听器*/
/*一般用来监听以及过滤未经授权的请求*/
LFApp.run(['$rootScope','$location','userService',function($rootScope,$location,userService){
    $rootScope.$on('$routeChangeStart',function(event,next,current){
        if(!userService.isLogin()){
            if(next.templateUrl === 'view/login.html'){
                /*已经转向登录路由因此无需重定向*/
            }else {
                $location.path('view/login.html');
                /*重定向*/
            }
        }
    });
    $rootScope.$on('$routeChangeSuccess',function(event,next,previous){
    });
    $rootScope.$on('$routeChangeSuccess',function(current,previous,rejection){
    });
    /*当reloadOnSearch属性被设置为false情况下，重新使用某个控制器的实例时，会广播$routeUpdate*/
    $rootScope.$on('$routeUpdate',function(current,previous,rejection){
    });
}]);