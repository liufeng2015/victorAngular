/**
 * Created by zzjz-pc15 on 2016/4/20.
 */
LFApp.constant(['$compileProvider',function($compileProvider){
    $compileProvider.directive('customDirective',function(){
        return {
            template:'<button>CLICK ME</button>'
        }
    });
}]);