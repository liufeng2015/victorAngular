/**
 * Created by zzjz-pc15 on 2016/5/19.
 */
(function(){
    'use strict';
    angular.module("draggable",[]).factory('draggableService',['$rootScope',function($rootScope){


        }])
        .directive("draggable",['$document','$compile','draggableService',function($document,$compile,draggableService){
            function linkOperation(){
                return function (scope,element,attrs){
                    //var onDragStart = scope.$eval(attrs.onDragStart),
                    //    onDrag = scope.$eval(attrs.onDrag),
                    //    onDragEnd = scope.$eval(attrs.onDragEnd);
                    var parentNode = angular.element($document[0].body);
                    if(!parentNode[0].querySelector(".lf_drag_object")){
                        var divs = "<div class='lf_drag_object'></div>";
                        var template = angular.element(divs);
                        var newHtml = $compile(template)(scope);
                        parentNode.append(newHtml);
                    }
                    var handle = angular.element($document.querySelector(".lf_drag_object"));
                    handle.css(scope.handStyle);
                    handle.css({
                        position:"absolute",
                        display:"none"
                    });
                    handle.css("z-index","1000");
                    element.attr("draggable",false);
                    handle.data("dragData",scope.dragData);
                    var disX = 0;
                    var disY = 0;
                    element.on('dragstart', function (event) {
                        event.preventDefault();
                        disX = event.clientX - handle.prop("offsetLeft")-handle.prop("offsetWidth");
                        disY = event.clientY-handle.prop("offsetTop")-handle.prop("offsetHeight");
                        $document.on("drag",dragMove);
                        $document.on("dragend",dragEnd);
                    });
                    function dragMove(event){
                        var l = event.clientX - disX;
                        var t = event.clientY - disY;

                    }
                    function dragEnd(event){

                    }
                    //element.on('drag', function (event) {
                    //    if (angular.isFunction(onDrag)) {
                    //        onDrag(event, element, element.data('dragData'));
                    //    }
                    //});
                    //element.on('dragend', function (event) {
                    //    element.attr("style","opacity:1");
                    //    element.removeClass('dragging');
                    //    if (angular.isFunction(onDragEnd)) {
                    //        onDragEnd(event, element, element.data('dragData'));
                    //    }
                    //});

                }
            }
            return{
                restrict:"A",
                scope: {
                    handStyle:"=",
                    dragData:"="
                },
                link:linkOperation()
            }
        }])

}());