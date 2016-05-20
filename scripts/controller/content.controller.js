/**
 * Created by liufeng on 16/4/3.
 */
LFApp.controller('contentCtrl',["$scope",'panelService',function($scope,panelService){
    /*下拉菜单*/
    $scope.files = [
        {
            group:"组名1",
            items:["组件1","组件2","组件3","组件4"]
        },
        {
            group:"组名2",
            items:["组件1","组件2","组件3"]
        },
        {
            group:"组名3",
            items:["组件1","组件2"]
        }
    ];
    /*表格*/
    $scope.tableConfig = {
        headList:[{k:"age"},{k:"name"},{k:"height"},{k:"weight"}],
        itemList:[[23,223,232,453],[11,343,353,3535],[11,343,353,3535],[11,343,353,3535],[11,343,353,3535],[11,343,353,3535],[23,223,232,453],[11,343,353,3535],[11,343,353,3535],[11,343,353,3535],[11,343,353,3535],[11,343,353,3535]],
        rows:5
    };
    /*panel*/
    $scope.panelList = [];
    var n = 0;
    $scope.addPanel = function(){
        n++;
        $scope.panelList.push({
            defaultWidth:"50%",
            defaultHeight:"60%",
            defaultName:"视图"+n
        })
    };
    $scope.$on("deletePanel",function(){
        panelService.deletePanel($scope.panelList,$scope);
    });
    /*draggable*/
    $scope.configStyle = {
        width:"100px",
        height:"100px",
        background:"red"
    };
    $scope.dragParam = "config111111111";
    this.mouseUp = function(){
        return function(data){
            alert(data);
        }

    }

}]);