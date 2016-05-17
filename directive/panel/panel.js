/**
 * Created by zzjz-pc15 on 2016/5/14.
 */
(function(){
    'use strict';
    angular.module("panel",[])
        .directive("panel",['$document','$compile',function($document,$compile){
            function linkOperation(){
                return function (scope,element,attrs){
                    //var minSizeFunc = eval(attrs.minSize);
                    //var maxSizeFunc = eval(attrs.maxSize);
                    //var closeViewFunc = eval(attrs.closeView);

                    var container = angular.element(element[0].querySelector('.panel_container'));
                    var header = angular.element(container[0].querySelector('.panel_navigation'));
                    var func = angular.element(header[0].querySelector('.panel_function'));
                    var minSize = angular.element(func[0].querySelector("#panel_minsize"));
                    var maxSize = angular.element(func[0].querySelector("#panel_maxsize"));
                    var closeView = angular.element(func[0].querySelector("#panel_close"));
                    var corner = angular.element(container[0].querySelector('.panel_corner'));
                    var options = scope.styleConfig;
                    applyStyles(options);
                    scope.postion = {
                        left:container.prop('offsetLeft')+"px",
                        top:container.prop('offsetTop')+"px",
                        width:container.prop('offsetWidth')+"px",
                        height:container.prop('offsetHeight')+"px"
                    };
                    var disX = 0;
                    var disY = 0;
                    header[0].addEventListener('mousedown', function (event) {
                        event.preventDefault();
                        disX = event.clientX - container.prop('offsetLeft');
                        disY = event.clientY - container.prop('offsetTop');
                        $document.on('mousemove', mouseMove);
                        $document.on('mouseup', mouseUp);
                    });
                    function mouseMove(event) {
                        var w = event.clientX - disX;
                        var l = event.clientY - disY;
                        if(w <= 0){
                            w = 0;
                        }else if( w > $document[0].body.clientWidth - container.prop('offsetWidth')){
                            w = $document[0].body.clientWidth - container.prop('offsetWidth');
                        }
                        if(l <= 0){
                            l = 0;
                        }else if( l > $document[0].body.clientHeight - container.prop('offsetHeight')){
                            l = $document[0].body.clientHeight - container.prop('offsetHeight');
                        }
                        scope.postion.top = l+"px";
                        scope.postion.left = w+"px";
                        container.css({
                            top: l + 'px',
                            left: w + 'px'
                        });
                    }
                    function mouseUp() {
                        $document.off('mousemove', mouseMove);
                        $document.off('mouseup', mouseUp);
                    }
                    var startHeight = 0;
                    var startWidth = 0;
                    corner[0].addEventListener('mousedown', function (event) {
                        event.preventDefault();
                        startWidth = event.clientX - container.prop('offsetLeft') - container.prop('offsetWidth');
                        startHeight = event.clientY - container.prop('offsetTop') - container.prop('offsetHeight');
                        $document.on('mousemove', mouseDrag);
                        $document.on('mouseup', mouseDrop);
                    });
                    function mouseDrag(event) {
                        var height = event.clientY - container.prop('offsetTop')  - startHeight;
                        var width = event.clientX - container.prop('offsetLeft') - startWidth;
                        scope.postion.width = width+"px";
                        scope.postion.height = height+"px";
                        container.css({
                            height: height + 'px',
                            width: width + 'px'
                        });
                    }
                    function mouseDrop() {
                        $document.off('mousemove', mouseDrag);
                        $document.off('mouseup', mouseDrop);
                    }
                    minSize[0].addEventListener('mousedown',function(event){

                    });
                    maxSize[0].addEventListener('mousedown',function(event){
                        if(container.css('width') != "100%"){
                            container.css({
                                top: '0px',
                                left: '0px',
                                width:'100%',
                                height:'100%'
                            });
                            maxSize.removeClass("glyphicon-resize-full");
                            maxSize.addClass("glyphicon-resize-small");
                        }else {
                            container.css(scope.postion);
                            maxSize.removeClass("glyphicon-resize-small");
                            maxSize.addClass("glyphicon-resize-full");
                        }
                        event.cancelBubble = true;
                    });
                    closeView[0].addEventListener('mousedown',function(event){

                    });

                    function applyStyles(options) {
                        container.css({
                            padding: options.headerHeight + 'px 0 0',
                            position: 'absolute',
                            border: [options.borderStyle, options.headerColor].join(' ')
                        });

                        header.css({
                            position: 'absolute',
                            top: 0,
                            height: options.headerHeight + 'px',
                            width: '100%',
                            background: options.headerColor,
                            cursor: 'move'
                        });

                        corner.css({
                            position: 'absolute',
                            bottom: -options.cornerSize / 2 + 'px',
                            right: -options.cornerSize / 2 + 'px',
                            width: options.cornerSize + 'px',
                            height: options.cornerSize + 'px',
                            background: options.cornerColor || options.headerColor,
                            transform: 'rotate(45deg)',
                            cursor: 'nwse-resize'
                        });
                    }
                }
            }
            var templateDivs = "<div class='panel_container'>";
            templateDivs += "<div class='panel_navigation'><span>数据视图</span><ul class='panel_function'><li id='panel_minsize'class='glyphicon glyphicon-minus'></li><li id='panel_maxsize' class='glyphicon glyphicon-resize-full'></li><li id = 'panel_close' class='glyphicon glyphicon-remove'></li></ul></div>";
            templateDivs += "<div class='panel_corner'></div>";
            templateDivs += "<div class='panel_transclude' ng-transclude></div>";
            templateDivs += "<div>";
            return{
                transclude:true,
                //require:'^panelBottom',
                scope:{
                    styleConfig:"="
                },
                template:templateDivs,
                link:linkOperation()
            }
        }])
        //.directive('panelBottom',['$compile',function($compile){
        //    return{
        //
        //    }
        //}])
}());