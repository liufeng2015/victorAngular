/**
 * Created by zzjz-pc15 on 2016/4/18.
 */
LFApp.config(['$httpProvider','$cacheFactory',function($httpProvider,$cacheFactory){
    $httpProvider.defaults.cache = $cacheFactory('lru',{
        capacity:20
    });/*最新的20个请求会被缓存，第21个请求导致LRU从缓存中将时间比较老的请求移除掉*/
    $httpProvider.interceptors.push('customInterceptor');/*拦截器*/
    /*默认请求头为：Accept：application/json,text/plain*/
    $httpProvider.defaults.headers.common['X-Requested-By']='liufengApp';/*默认头部配置*/
    /*$httpProvider.defaults.headers.post['X-Posted-By']='liufengApp‘ 只对post请求头进行配置*/
    /*$httpProvider.defaults.headers.put['X-Posted-By']='liufengApp‘*/
}]);