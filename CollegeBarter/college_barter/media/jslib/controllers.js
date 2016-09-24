'use strict';
angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $state) {
        $scope.nav = {
            nav1: "最近发布",
            nav2: "发布物品",
            nav3: "我的发布",
            nav4: "我的收藏"
        }
        $scope.title = "高校网上跳蚤市场";
        $scope.data = {
            nav1: true,
            nav2: false,
            nav3: false,
            nav4: false,
        }
    })
    .controller('LoginCtrl', function ($scope, $state, apiServices, $cookies) {
        $scope.user = {
            username: "",
            pwd: "",
            pwdCheck: "",
            sno: "",
            school: "",
            phone: "",
            qqNum: ""
        }

        $scope.schoolList = [
            {value: "中国矿业大学（北京）"},
            {value: "中国农业大学"},
            {value: "北京林业大学"}
        ];
        $scope.state = "login";

        $scope.login = function () {
            if (!$scope.user.username) {
                alert("请输入用户名");
                console.log($scope.user.username);
                return;
            }
            if (!$scope.user.pwd) {
                alert("请输入密码");
                console.log($scope.user.pwd);
                return;
            }
            var data = JSON.stringify({"type": "login", "username": $scope.user.username, "password": $scope.user.pwd});
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    alert(data.info);
                    return;
                } else {
                    $cookies.put("username", data.username);
                    console.log($cookies.getAll());
                    $state.go('app.recent')
                }
            });
        };

        $scope.goToReg = function () {
            $scope.state = "reg"
        }

        $scope.backToLogin = function () {
            $scope.state = "login"
        }

        $scope.reg = function () {

        }
    })

    .controller('RecentCtrl', function ($scope, $state, $cookies, apiServices) {
        //var name = "{{username}}";
        if(!$cookies.get("username")){
            $state.go('app.login');
        } else {
            $scope.username = $cookies.get("username");
        }
        console.log($scope.username);
        $scope.barter = [];
        $scope.start = 0;
        $scope.numOfLoadContent = 10;
        $scope.end = $scope.start + $scope.numOfLoadContent;
        $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
        $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";

        $scope.barter.loadContent = function () {
            var data = JSON.stringify({
                "type": "recent-barters",
                "recent-start": $scope.start,
                "recent-end": $scope.end
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    alert(data.info);
                    return;
                } else {
                    $scope.barter = data.data;
                    console.log($scope.barter);
                }
            });
        }
        $scope.barter.loadContent();
        //var end;
        //var len;
        //var category;
        //function fenye(val)
        //{
        //    /*$(".group").colorbox({rel:'group', transition:"fade"});*/
        //    category=$("#cate  option:selected").val();
        //    //category=$("select[id=cate]").val();
        //    switch (val){
        //        case 0://shouye
        //            start=0;
        //            end=10;
        //            break;
        //        case 1://prev
        //            if(start!=0){
        //                start-=10;
        //                end-=10;
        //            }else{
        //                alert("已经是第一页了");
        //                return;
        //            }
        //            break;
        //        case 2:
        //            if(len<10){
        //                alert("已经是最后一页了");
        //                return;
        //            }
        //            else{
        //                start+=10;
        //                end+=10;
        //            }
        //            break;
        //    }
        //    if(category!=0){
        //        var data={"type":"get-barters-by-category","category":category,"recent-start":start,"recent-end":end};
        //        var post_data = {"data":JSON.stringify(data)};
        //        $("#content").empty();
        //        $.post("/request/",post_data,function (data){
        //            data = JSON.parse(data.replace(/<script.*<\/script>/,''));
        //            if(data.ret!='1101'){
        //                alert(data.info);
        //                return;
        //            }
        //            var barter = data.data;
        //            len=barter.length;
        //            var html="";
        //            var resize_image='http://collegebarter-resizefile.stor.sinaapp.com/';
        //            var image_prefix = 'http://collegebarter-uploadfile.stor.sinaapp.com/';
        //            $.each(barter,function(barterSha1,barter){
        //                html = '';
        //                html+='<div class="barter"><div id=head><div id=himg><img width=60px height=60px id="headimg" align="left" src='+image_prefix+barter.headimg+
        //                    '></div><div id=htext colstatus='+barter.is_collected+' sha1='+barter.barterSha1+'><h1 style="color:#0000FF">'+barter.title+
        //                    '<input id="collect" type="image" width=50px height=50px src="../media/images/collect.jpg" align="right"'+
        //                    'onClick="collect(this)"/>'+
        //                    '</h1><a style="font-size:16px">用户名:'+barter.creatorName+'&nbsp;&nbsp;&nbsp;&nbsp;发布时间:'+barter.time+
        //                    '</a><br /></div></div><p style="font-size:16px;background-color:#AFEEEE;font-family:宋体">'+barter.content+'</p>'
        //                if(barter.image_one_sha1){html+='<a class="group" href='+image_prefix+barter.image_one_sha1+'><img width=200px height=200px src='+
        //                    resize_image+barter.image_one_sha1+'></a>'};
        //                if(barter.image_two_sha1){html+='<a class="group" href='+image_prefix+barter.image_two_sha1+'><img width=200px height=200px src='+
        //                    resize_image+barter.image_two_sha1+'></a>'};
        //                if(barter.image_three_sha1){html+='<a class="group" href='+image_prefix+barter.image_three_sha1+'><img width=200px height=200px src='+
        //                    resize_image+barter.image_three_sha1+'></a>'};
        //                if(barter.image_four_sha1){html+='<a class="group" href='+image_prefix+barter.image_four_sha1+'><img width=200px height=200px src='+
        //                    resize_image+barter.image_four_sha1+'></a>'};
        //                html += "</div>"
        //                $("#content").append(html);
        //                $(".group").on("click",function(){
        //                    $(this).colorbox({rel:'group', transition:'fade',width:"600px",height:"600px"});
        //                });
        //            })
        //        });
        //    }else{
        //        var data={"type":"recent-barters","recent-start":start,"recent-end":end};
        //        var post_data = {"data":JSON.stringify(data)};
        //        $("#content").empty();
        //        $.post("/request/",post_data,function (data){
        //            data = JSON.parse(data.replace(/<script.*<\/script>/,''));
        //            if(data.ret!='1101'){
        //                alert(data.info);
        //                return;
        //            }
        //            var barter = data.data;
        //            len=barter.length;
        //            var html="";
        //            var resize_image='http://collegebarter-resizefile.stor.sinaapp.com/';
        //            var image_prefix = 'http://collegebarter-uploadfile.stor.sinaapp.com/';
        //            $.each(barter,function(barterSha1,barter){
        //                html = '';
        //                html+='<div class="barter"><div id=head><div id=himg><img width=60px height=60px id="headimg" align="left" src=http://collegebarter-uploadfile.stor.sinaapp.com/' +
        //                    ''+barter.headimg+
        //                    '></div><div id=htext colstatus='+barter.is_collected+' sha1='+barter.barterSha1+'><h1 style="color:#0000FF">'+barter.title+
        //                    '<input id="collect" type="image" width=50px height=50px src="../media/images/collect.jpg" align="right"'+
        //                    'onClick="collect(this)"/>'+
        //                    '</h1><a style="font-size:16px">用户名:'+barter.creatorName+'&nbsp;&nbsp;&nbsp;&nbsp;发布时间:'+barter.time+
        //                    '</a><br /></div></div><p style="font-size:16px;background-color:#AFEEEE;font-family:宋体">'+barter.content+'</p>'
        //                if(barter.image_one_sha1){html+='<a class="group" href='+image_prefix+barter.image_one_sha1+'><img width=200px height=200px src='+
        //                    resize_image+barter.image_one_sha1+'></a>'};
        //                if(barter.image_two_sha1){html+='<a class="group" href='+image_prefix+barter.image_two_sha1+'><img width=200px height=200px src='+
        //                    resize_image+barter.image_two_sha1+'></a>'};
        //                if(barter.image_three_sha1){html+='<a class="group" href='+image_prefix+barter.image_three_sha1+'><img width=200px height=200px src='+
        //                    resize_image+barter.image_three_sha1+'></a>'};
        //                if(barter.image_four_sha1){html+='<a class="group" href='+image_prefix+barter.image_four_sha1+'><img width=200px height=200px src='+
        //                    resize_image+barter.image_four_sha1+'></a>'};
        //                html += "</div>"
        //                $("#content").append(html);
        //                $(".group").on("click",function(){
        //                    $(this).colorbox({rel:'group', transition:'fade',width:"600px",height:"600px"});
        //                });
        //            })
        //        });
        //    }
        //    $("#log").val(username);
        //}
        //$(document).ready(function(){
        //    fenye(0);
        //})
    })

    .controller('MyReleaseCtrl', function ($scope, $state, $cookies, apiServices) {
        if(!$cookies.get("username")){
            $state.go('app.login');
        } else {
            $scope.username = $cookies.get("username");
        }
        $scope.barter = [];
        $scope.start = 0;
        $scope.numOfLoadContent = 10;
        $scope.end = $scope.start + $scope.numOfLoadContent;

        $scope.barter.loadContent = function () {
            var data = JSON.stringify({
                "type": "get-my-barters",
                "recent-start": $scope.start,
                "recent-end": $scope.end
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    alert(data.info);
                    return;
                } else {
                    $scope.barter = data.data;
                    console.log($scope.barter);
                }
            });
        }
        $scope.barter.loadContent();
    })

    .controller('MyCollectCtrl', function ($scope, $state, $cookies, apiServices) {
        if(!$cookies.get("username")){
            $state.go('app.login');
        } else {
            $scope.username = $cookies.get("username");
        }
        $scope.barter = [];
        $scope.start = 0;
        $scope.numOfLoadContent = 10;
        $scope.end = $scope.start + $scope.numOfLoadContent;

        $scope.barter.loadContent = function () {
            var data = JSON.stringify({
                "type": "collected-barters",
                "recent-start": $scope.start,
                "recent-end": $scope.end
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    alert(data.info);
                    return;
                } else {
                    $scope.barter = data.data;
                    console.log($scope.barter);
                }
            });
        }
        $scope.barter.loadContent();
    })

    .controller('ReleaseCtrl', function ($scope, $state, $cookies, apiServices, flowFactoryProvider) {
        if(!$cookies.get("username")){
            $state.go('app.login');
        } else {
            $scope.username = $cookies.get("username");
        }
        $scope.barter = {};
        $scope.categoryList = [
            {
                value:1,
                name:"图书"
            },
            {
                value:2,
                name:"服装"
            },
            {
                value:3,
                name:"食品"
            },
            {
                value:4,
                name:"电子产品"
            },
            {
                value:5,
                name:"体育用品"
            },
            {
                value:6,
                name:"户外用品"
            }
        ];
        $scope.release = function () {
            var data = JSON.stringify({
                "type": "create-barter",
                "userName":$scope.username,
                "title":$scope.barter.title,
                "category":$scope.barter.category,
                "description":$scope.barter.description
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    alert(data.info);
                    return;
                } else {
                    $scope.barterSha1 = data.barterSha1;
                    flowFactoryProvider.upload();
                }
            });
        }
    })