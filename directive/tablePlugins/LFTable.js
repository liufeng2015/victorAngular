/**
 * Created by liufeng on 16/5/16.
 */
(function(){
    'use strict';
    angular.module("LFTable",[])
        .directive("lfTable",['$compile',function($compile){
            var templateDivs = "<div class = 'lf_container'>";
            templateDivs += "<div class = 'lf_head'>";
            templateDivs += "<div class='lf_rowInput'><span>rows:</span><input type='text' ng-model='tableConfig.rows' placeholder='please input'></div>";
            templateDivs += "<div class='lf_search'><span>search:</span><input type='text' ng-model='search' placeholder='please input'></div>";
            templateDivs += "</div>";
            templateDivs += "<table class= 'lf_table'>";
            templateDivs += "<thead><tr>";
            templateDivs += "<th class='bg-info' ng-repeat = 'head in tableConfig.headList' ng-bind='head.k'></th>";
            templateDivs += "</tr></thead>";
            templateDivs += "<div class = 'lf_tbody_border'>";
            templateDivs += "<tbody ng-repeat='itemArr in itemList'>";
            templateDivs += "<tr ng-repeat='itemArr2 in itemArr'><td ng-repeat='item in itemArr2' ng-bind='item'></td></tr>";
            templateDivs += "</tbody>";
            templateDivs += "</div>";
            templateDivs += "</table>";
            templateDivs += "<div class ='lf_tablebottom'>";
            templateDivs += "<div class= 'lf_right'><div class='lf_next_step glyphicon glyphicon-step-forward'></div><div class='lf_next_page glyphicon glyphicon-fast-forward'></div></div>";
            templateDivs += "<div class= 'lf_center'><div class='lf_single_step'></div></div>";
            templateDivs += "<div class= 'lf_left'><div class='lf_previous_page glyphicon glyphicon-fast-backward' ></div><div class='lf_previous_step glyphicon glyphicon-step-backward'></div></div>";
            templateDivs += "</div>";
            templateDivs += "</div>";
            return{
                restrict:"EA",
                template:templateDivs,
                scope:{
                    tableConfig:"="
                },
                controllerAs:"lfTableCtrl",
                controller:function($scope,$element){
                    //$scope.
                    var itemList = $scope.tableConfig.itemList;
                    var rows = $scope.tableConfig.rows;
                    var num = Math.ceil(itemList.length/rows);
                    $scope.itemList = [];
                    var arr = [];
                    for (var i = 0; i < itemList.length;i++){
                        //if()
                    }
                    $scope.itemList = arr;
                }
            }
        }]);
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