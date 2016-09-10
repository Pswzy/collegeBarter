'use strict';
angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $http , apiServices) {
        $scope.user = {
                username:"",
                pwd:""
            }

        $scope.login = function(){
            if(!$scope.user.username)
            {
                alert("用户名不能为空");
                console.log($scope.user.username);
                return;
            }
            if(!$scope.user.pwd)
            {
                alert("密码不能为空");
                console.log($scope.user.pwd);
                return;
            }
            var data = {"type":"login","username":$scope.user.username,"password":$scope.user.pwd};
            var postdata = {"data":JSON.stringify(data)};
            var responsePromise = apiServices.login(postdata);
            console.log(responsePromise);
            //responsePromise.success(function(data){
            //
            //});
                //resp = JSON.parse(resp.replace(/<script.*<\/script>/,''));
                //if(resp.ret!='1101'){
                //    alert(resp.info);
                //    return;
                //}
                //location.href="/index";
        };
});