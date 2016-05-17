/**
 * Created by liufeng on 16/5/16.
 */
(function(){
    'use strict';
    angular.module("LFTable",[])
        .directive("lfTable",['$compile',function($compile){
            var templateDivs = "<div class = 'lf_container'>";
            templateDivs += "<div class = 'lf_head'>";
            templateDivs += "<div class='lf_rowInput'><span>rows:</span><input type='text' ng-model='rows' placeholder='请输入'></div>";
            templateDivs += "<div class='lf_search'><span>search:</span><input type='text' ng-model='search' placeholder='请输入'></div>";
            templateDivs += "</div>";
            templateDivs += "<table class= 'lf_table'>";
            templateDivs += "<thead><tr>";
            templateDivs += "<th ng-repeat = 'head in tableConfig.headList' ng-bind='head.key'><th>";
            templateDivs += "</tr></thead>";
            templateDivs += "<tbody>";
            templateDivs += "<tr ng-repeat='itemArr in tableConfig.itemList'><td ng-repeat='item in itemArr' ng-bind='item'></td></tr>";
            templateDivs += "</tbody>";
            templateDivs += "</table>";
            templateDivs += "</div>";
            return{
                restrict:"EA",
                template:templateDivs,
                scope:{
                    tableConfig:"="
                },
                //compile:function(scope,element){
                //    return{
                //        pre:function(scope,element){
                //            //var parentNode = angular.element(element[0]);
                //            //var divs = "<side-item ng-repeat='item in sideData' item-data='item'></side-item>";
                //            //var template = angular.element(divs);
                //            //var newHtml = $compile(template)(scope);
                //            //parentNode.append(newHtml);
                //        }
                //    }
                //},
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
        //.directive("sideItem",['$compile',function($compile){
        //    return{
        //        restrict:'E',
        //        require:"^sideList",
        //        scope:{
        //            itemData:"="
        //        },
        //        compile:function(scope,element,attrs,sideListCtrl){
        //            return{
        //                pre:function(scope,element){
        //                    var parentNode = angular.element(element[0]);
        //                    var divs = "<div class='side_title' ng-click='selectClick()'><span>"+scope.itemData.group+"</span></div>";
        //                    divs += "<ul class='side_ul' ng-hide = 'isHide'>";
        //                    angular.forEach(scope.itemData.items,function(item){
        //                        divs += "<li class='side_li'><span>"+item+"</span></li>";
        //                    });
        //                    divs += "</ul>";
        //                    var template = angular.element(divs);
        //                    var newHtml = $compile(template)(scope);
        //                    parentNode.append(newHtml);
        //                },
        //                post:function(scope,element,attrs,sideListCtrl){
        //                    scope.isHide = true;
        //                    sideListCtrl.group.push(scope);
        //                    scope.selectClick =function(){
        //                        scope.isHide = !scope.isHide;
        //                        sideListCtrl.closeOtherItem(scope);
        //                    }
        //                }
        //            }
        //        }
        //
        //    }
        //}])

}());