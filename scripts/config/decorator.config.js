/**
 * Created by zzjz-pc15 on 2016/4/18.
 */
/*为userService添加装饰器，加入日志功能从而为每个请求都加上一个时间戳*/
LFApp.config(['$provide',function($provide){
    $provide.decorator('userService',function($delegate,$log){
        return{
            events: function(path){
                var startTime = new Date();
                var events = $delegate.events(path);
                events.finally(function(){
                    $log.info("fetching events"+"took"+(new Date()-startTime)+"ms");
                });
                return events;
            }
        }
    })
}]);