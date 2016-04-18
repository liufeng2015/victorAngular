/**
 * Created by liufeng on 16/4/3.
 */
(function(){
    'use strict';
    angular.module("sideList",[])
        .directive("sideList",['$compile',function($compile){
            return{
                restrict:"EA",
                scope:{
                    sideData:"="
                },
                compile:function(scope,element){
                    return{
                        pre:function(scope,element){
                            var parentNode = angular.element(element[0]);
                            var divs = "<side-item ng-repeat='item in sideData' item-data='item'></side-item>";
                            var template = angular.element(divs);
                            var newHtml = $compile(template)(scope);
                            parentNode.append(newHtml);
                        }
                    }
                },
                controllerAs:"sideListCtrl",
                controller:function($scope,$element){
                    this.group = [];
                    var self = this;
                    this.closeOtherItem = function(currentScope){
                        angular.forEach(self.group,function(nowScope){
                            if(nowScope != currentScope){
                                nowScope.isHide = true;
                            }
                        })
                    };

                }
            }
    }])
        .directive("sideItem",['$compile',function($compile){
            return{
                restrict:'E',
                require:"^sideList",
                scope:{
                    itemData:"="
                },
                compile:function(scope,element,attrs,sideListCtrl){
                    return{
                        pre:function(scope,element){
                            var parentNode = angular.element(element[0]);
                            var divs = "<div class='side_title' ng-click='selectClick()'><span>"+scope.itemData.group+"</span></div>";
                            divs += "<ul class='side_ul' ng-hide = 'isHide'>";
                            angular.forEach(scope.itemData.items,function(item){
                                divs += "<li class='side_li'><span>"+item+"</span></li>";
                            });
                            divs += "</ul>";
                            var template = angular.element(divs);
                            var newHtml = $compile(template)(scope);
                            parentNode.append(newHtml);
                        },
                        post:function(scope,element,attrs,sideListCtrl){
                            scope.isHide = true;
                            sideListCtrl.group.push(scope);
                            scope.selectClick =function(){
                                scope.isHide = !scope.isHide;
                                sideListCtrl.closeOtherItem(scope);
                            }
                        }
                    }
                }

            }
        }])

}());