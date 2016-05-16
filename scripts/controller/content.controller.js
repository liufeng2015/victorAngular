/**
 * Created by liufeng on 16/4/3.
 */
LFApp.controller('contentCtrl',["$scope",function($scope){
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
    $scope.tableConfig = {
        headList:[{k:"age"},{k:"name"},{k:"height"},{k:"weight"}],
        itemList:[[23,223,232,453],[11,343,353,3535],[11,343,353,3535],[11,343,353,3535],[11,343,353,3535],[11,343,353,3535]],
        rows:5
    }
}]);