/**
 * Created by zzjz-pc15 on 2016/5/19.
 */
(function(){
    'use strict';
    angular.module("draggable",[]).factory("draggableService",[function(){
        var _dragData = null;
        return {
            setDragData:function(data){
                _dragData = data;
            },
            getDragData:function(){
                return _dragData;
            }
        }
    }])
        .directive("lfDraggable",['$document','$compile','draggableService',function($document,$compile,draggableService){
            function linkOperation(){
                return function (scope,element,attrs){
                    var parentNode = angular.element($document[0].body);
                    if(!parentNode[0].querySelector("#lf_drag_object")){
                        var divs = "<div id ='lf_drag_object'></div>";
                        var template = angular.element(divs);
                        var newHtml = $compile(template)(scope);
                        parentNode.append(newHtml);
                    }
                    var handle = angular.element($document[0].querySelector("#lf_drag_object"));
                    handle.css(scope.handStyle);
                    handle.css({
                        position:"absolute",
                        display:"none"
                    });
                    handle.css("z-index","1000");
                    element.attr("draggable",false);
                    //handle.data("dragData",scope.dragData);
                    var disX = 0;
                    var disY = 0;
                    element.on('mousedown', function (event) {
                        event.preventDefault();
                        disX = event.clientX;
                        disY = event.clientY;
                        draggableService.setDragData(scope.dragData);
                        $document.on("mousemove",mouseMove);
                        $document.on("mouseup",mouseUp);
                    });
                    function mouseMove(event){
                        var l = event.clientX - disX ;
                        var t = event.clientY - disY;
                        handle.css({
                            display:"block"
                        });
                        if(l <= 0){
                            l = 0;
                        }else if(l > $document[0].body.clientWidth - handle.prop("offsetWidth")){
                            l = $document[0].body.clientWidth - handle.prop("offsetWidth");
                        }
                        if(t <= 0){
                            t = 0;
                        }else if(t > $document[0].body.clientHeight - handle.prop("offsetHeight")){
                            t = $document[0].body.clientHeight- handle.prop("offsetHeight");
                        }
                        handle.css({
                            left:l+"px",
                            top:t+"px"
                        })
                    }
                    function mouseUp(event){
                        $document.off("mousemove",mouseMove);
                        $document.off("mouseup",mouseUp);
                        handle.css({
                            display:"none"
                        });
                    }
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
        .directive("lfDroppable",['$document','$compile','draggableService',function($document,$compile,draggableService){
            function linkOperation(){
                return function (scope,element,attrs){
                    var customMouseUp = scope.$eval(attrs.mouseUp);
                    element.on("mouseenter",function(event){
                        event.preventDefault();
                        if(event.fromElement.lastChild && event.fromElement.lastChild.id == "lf_drag_object"){
                            var drag_object = angular.element($document[0].querySelector("#lf_drag_object"));
                            var data = draggableService.getDragData();
                            if(angular.isFunction(customMouseUp)){
                                customMouseUp(data);
                            };
                        }
                    });
                }
            }
            return{
                restrict:"A",
                link:linkOperation()
            }
        }])

}());