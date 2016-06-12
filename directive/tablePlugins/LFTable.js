/**
 * Created by liufeng on 16/5/16.
 */
(function(){
    'use strict';
    angular.module("LFTable",[])
        .directive("lfTable",['$compile',function($compile){
            var isFlag = true;
            function setAnimate (obj,target){
                clearInterval(obj.timer);
                isFlag = false;
                obj.timer = setInterval(function(){
                    var curW = obj.prop("offsetLeft");
                    var speed = (target - curW)/4;
                    speed = speed >0 ?Math.ceil(speed):Math.floor(speed);
                    if(curW == target){
                        clearInterval(obj.timer);
                        isFlag = true;
                    }
                    obj.css({left:(curW+speed)+"px"});
                },10);
            };
            function tableController(){
                return function($scope,$element){
                    var itemList = $scope.tableConfig.itemList;
                    var p = [];
                    angular.forEach(itemList,function(item,index){
                        p.push(index+1);
                    });
                    $scope.liList = p;

                    var rows = $scope.tableConfig.rows;
                    var arr = angular.copy(itemList);
                    $scope.itemList = arr.slice(0,5);

                    var bottomContainer = angular.element($element[0].querySelector(".lf_single_ul"));
                    var cWidth = ($scope.liList.length * 40)+"px";
                    bottomContainer.css({width:cWidth});
                    bottomContainer.timer = null;
                    $scope.nextPages = function(){
                        var curLeft = bottomContainer.prop("offsetLeft");
                        if(!isFlag) return;
                        var w = Math.round((bottomContainer.prop("offsetWidth")+curLeft)/40);
                        if(w <= 8){
                            curLeft = -((bottomContainer.prop("offsetWidth")/40)-4)*39
                        }else{
                            curLeft += -39*4;
                        }
                        setAnimate(bottomContainer,curLeft);
                    };
                    $scope.nextStep = function(){
                        var curLeft = bottomContainer.prop("offsetLeft");
                        if(!isFlag) return;
                        var w = Math.round((bottomContainer.prop("offsetWidth")+curLeft)/40);
                        if(w <= 4) return;
                        curLeft += -39;
                        setAnimate(bottomContainer,curLeft);
                    };
                    $scope.previousPages = function(){
                        var curLeft = bottomContainer.prop("offsetLeft");
                        if(!isFlag) return;
                        if(curLeft == 0)return;
                        var w = Math.abs(curLeft/39);
                        if(w <= 4){
                            curLeft = 0;
                        }else{
                            curLeft += 4*39;
                        }
                        setAnimate(bottomContainer,curLeft);
                    };
                    $scope.previousStep = function(){
                        var curLeft = bottomContainer.prop("offsetLeft");
                        if(!isFlag) return;
                        if(curLeft == 0)return;
                        curLeft += 39;
                        setAnimate(bottomContainer,curLeft);
                    };
                    $scope.selectPage = function(index){
                        var a = angular.copy(itemList);
                        var n = (index-1)*5;
                        $scope.itemList = a.slice(n,n+5);
                    }
                }
            }
            tableController.$inject = ['$scope','$element'];
            var templateDivs = "<div class = 'lf_container'>";
            templateDivs += "<div class = 'lf_head'>";
            templateDivs += "<div class='lf_rowInput'><span>rows:</span><input type='text' ng-model='tableConfig.rows' placeholder='please input'></div>";
            templateDivs += "<div class='lf_search'><span>search:</span><input type='text' ng-model='search' placeholder='please input'></div>";
            templateDivs += "</div>";
            templateDivs += "<table class= 'lf_table'>";
            templateDivs += "<thead><tr>";
            templateDivs += "<th class='bg-info' ng-repeat = 'head in tableConfig.headList' ng-bind='head.k'></th>";
            templateDivs += "</tr></thead>";
            templateDivs += "<tbody >";
            templateDivs += "<tr ng-repeat='itemArr2 in itemList'><td ng-repeat='item in itemArr2' ng-bind='item'></td></tr>";
            templateDivs += "</tbody>";
            templateDivs += "</table>";
            templateDivs += "<div class ='lf_tablebottom'>";
            templateDivs += "<div class= 'lf_right'><div btn class='lf_next_step glyphicon glyphicon-step-forward' ng-click='previousStep()'></div><div btn class='lf_next_page glyphicon glyphicon-fast-forward' ng-click='previousPages()' ></div></div>";
            templateDivs += "<div class= 'lf_center'><div class='lf_single_step'><ul class='lf_single_ul'>";
            templateDivs += "<li class='lf_center_li' btn ng-repeat='liIndex in liList' ng-bind='liIndex' ng-click='selectPage(liIndex)'></li>";
            templateDivs += "</ul></div></div>";
            templateDivs += "<div class= 'lf_left'><div btn class='lf_previous_page glyphicon glyphicon-fast-backward' ng-click='nextPages()' ></div><div btn class='lf_previous_step glyphicon glyphicon-step-backward' ng-click='nextStep()'></div></div>";
            templateDivs += "</div>";
            templateDivs += "</div>";
            return{
                restrict:"EA",
                template:templateDivs,
                scope:{
                    tableConfig:"="
                },
                controllerAs:"lfTableCtrl",
                controller:tableController()
            }
        }])
        .directive('btn',[function(){
            return{
                restrict:"A",
                link:function(scope,element,attrs){
                    element.on('mousedown',function(event){
                        event.preventDefault();
                        element.css("background","#cdcdcd");
                    });
                    element.on('mouseup',function(event){
                        event.preventDefault();
                        element.css("background","white");
                    });
                }
            }
        }])


}());