/**
 * Created by zzjz-pc15 on 2016/4/17.
 */
LFApp.factory('sessionService',['$window',function($window){
    return{
        set:function(key,val){
            return $window.sessionStorage.setItem(key,val);
        },
        get:function(key){
            return $window.sessionStorage.getItem(key);
        },
        cutoff:function(key){
            return $window.sessionStorage.removeItem(key);
        }
    }
}]);