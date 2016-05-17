/**
 * Created by zzjz-pc15 on 2016/4/20.
 */
(function(){
    'use strict';
    angular.module('customScroll',[])
        .directive('clickScroll',['$compile',function($compile){
            return {
                restrict:"EA",
                compile:function(scope,element){
                    return{
                        pre:function(scope,element){
                            var parentNode = angular.element(element[0]);
                            var divs = "<div style='position:absolute;width:40px;height: 200px;opacity: 0.2;background: linear-gradient(#f5f5f5, black,#f5f5f5);'></div>";
                            //var template = angular.element(divs);
                            //var newHtml = $compile(template)(scope);
                            //parentNode.append(newHtml);
                        },
                        post:function(scope,element,attr){

                        }
                    }
                }

            }
        }])

}());