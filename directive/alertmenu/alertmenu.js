/**
 * Created by liufeng on 16/4/10.
 */
(function(){
    'use strict';
    angular.module("alertMenu",[])
        .directive('alertMenu',['$parse',function($parse){
            return {
                restrict:"A",
                link:function(scope,element,attrs){
                    var alertClick = scope.$eval(attrs.alertClick);
                    element.on('click',function(event){
                        event.preventDefault();
                        if(angular.isFunction(alertClick)){

                        }
                    })
                }
            }
        }]);
}());