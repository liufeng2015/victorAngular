/**
 * Created by zzjz-pc15 on 2016/3/25.
 */
var dragular = angular.module("dragular",[]);
var  currentIdNum = 0;
function generateUniqueId() {
    if (!currentIdNum) {
        currentIdNum = 0;
    }
    currentIdNum += 1;
    return 'draggable-id-' + currentIdNum;
}
dragular.directive("zzjzDrag",function(){
    return{
        restrict:"A",
        link:function(scope, element, attrs){
            var dragData = scope.$eval(attrs.dragData),
                onDragStart = scope.$eval(attrs.onDragStart),
                onDrag = scope.$eval(attrs.onDrag),
                onDragEnd = scope.$eval(attrs.onDragEnd);
            if (!element.attr('id')) {
                element.attr('id', generateUniqueId());
            }
            element.attr('draggable', true);
            element.data('dragData', dragData);

            element.on('dragstart', function (event) {
                event.dataTransfer.setData('text/plain', element.attr('id'));
                element.attr("style","opacity:0.4");
                angular.element(document.getElementsByClassName('dragging')).removeClass('dragging');
                element.addClass('dragging');
                if (angular.isFunction(onDragStart)) {
                    onDragStart(event, element, element.data('dragData'));
                }
            });
            element.on('drag', function (event) {
                if (angular.isFunction(onDrag)) {
                    onDrag(event, element, element.data('dragData'));
                }
            });
            element.on('dragend', function (event) {
                element.attr("style","opacity:1");
                element.removeClass('dragging');
                if (angular.isFunction(onDragEnd)) {
                    onDragEnd(event, element, element.data('dragData'));
                }
            });
        }
    }
});
dragular.directive("zzjzDrop",function(){
    return{
        restrict:"A",
        link:function(scope, element, attrs){
            var onDragEnter = scope.$eval(attrs.onDragEnter),
                onDragOver  = scope.$eval(attrs.onDragOver),
                onDragLeave = scope.$eval(attrs.onDragLeave),
                onDrop      = scope.$eval(attrs.onDrop);
            element.on('dragenter', function (event) {
                event.preventDefault();
                if (angular.isFunction(onDragEnter)) {
                    var draggedNode = document.getElementsByClassName('dragging')[0],
                        draggedEl = angular.element(draggedNode);
                    onDragEnter(event, element, draggedEl, draggedEl.data('dragData'));
                }
            });
            element.on('dragover', function (event) {
                event.preventDefault();
                if (angular.isFunction(onDragOver)) {
                    var draggedNode = document.getElementsByClassName('dragging')[0],
                        draggedEl = angular.element(draggedNode);
                    onDragOver(event, element, draggedEl, draggedEl.data('dragData'));
                }
            });
            element.on('dragleave', function (event) {
                if (angular.isFunction(onDragLeave)) {
                    var draggedNode = document.getElementsByClassName('dragging')[0],
                        draggedEl = angular.element(draggedNode);
                    onDragLeave(event, element, draggedEl, draggedEl.data('dragData'));
                }
            });
            element.on('drop', function (event) {
                event.preventDefault();
                if (angular.isFunction(onDrop)) {
                    var dragElementId = event.dataTransfer.getData('text/plain'),
                        draggedEl = angular.element(document.getElementById(dragElementId));
                    onDrop(event, element, draggedEl, draggedEl.data('dragData'));
                }
            });
        }
    }
});