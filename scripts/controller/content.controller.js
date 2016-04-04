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
    ]
}]);