/**
 * Created by zzjz-pc15 on 2016/4/18.
 */
LFApp.factory('customInterceptor',['$q',function($q){
    return{
        request:function(config){
            return config;/*$q.when(config)*/
        },
        response:function(response){
            return response;/*$q.when(config)*/
        },
        requestError:function(rejection){
            return response;/*$q.reject(rejection)*/
        },
        responseError:function(rejection){
            return rejection;/*$q.reject(rejection)*/
        }
    }
}]);
/*4中拦截器*/