/**
 * Created by zzjz-pc15 on 2016/4/17.
 */
/*所有的服务工厂都是由$provide创建*/
LFApp.constant('apiKey','2413112234');/*已经存在的变量值注册为服务将其注入到其他部分，例如给后端服务一apikey*//*可以注入到配置函数当中*/
/*constant方法在所有配置之前执行*/
LFApp.value('apiKey','2413112234');/*可以用来注册服务对象或函数*/
LFApp.config('userServiceProvider',function(userServiceProvider){
    userServiceProvider.setCustomUrl("https://baidu.com");
});
LFApp.provider('userService',['$http','$window','sessionService',function($http,$window,sessionService){
    /*默认状态*/
    var defaultUrl = 'https://github.com';
    this.setCustomUrl = function(){
        if(url)defaultUrl = url;
    };
    this.$get = function($http,$window,sessionService){
        return{
            /*一般采用post方式，url不会暴露用户名密码信息*/
            login:function(uname,pwd){
                $http.post(defaultUrl+'user/login',{
                    username:uname,
                    password:pwd
                }).success(function(data){
                    sessionService.set('username',data.username);
                    sessionService.set('uid',data.uid);
                    sessionService.set('sign',data.sign)
                }).error(function(data){
                    console.log(data);
                });
            },
            logout:function(){
                $http.post(defaultUrl+'user/logout')
                 .success(function(data){
                     sessionService.set('username',null);
                     sessionService.set('uid',null);
                     sessionService.set('sign',null);
                     $window.location.href = '#/';
                     $window.location.reload(true);
                }).error(function(data){
                    console.log(data);
                });
            },
            isLogin:function(){
                return sessionService.get('uid')? false:sessionService.get('uid');
            }

        }
    };
}]);