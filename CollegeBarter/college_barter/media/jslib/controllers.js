'use strict';
angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $state, $cookies, apiServices) {
    if(!$cookies.get("username")){
        $state.go('app.login');
    } else {
        $scope.username = $cookies.get("username");
    }
    // $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    // $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    $scope.resize_image_url = "/media/resize_image/resize_";
    $scope.upload_image_url = "/media/upload_image/";
    $scope.head = {
        user: "用户信息",
        logout: "注销登录",
        state: false
    }
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
    $scope.currentState = $state.current.name;
    $scope.modal = {
        title: "用户信息",
        username: "用户名：",
        realname: "真实姓名：",
        school:"学校：",
        qq:"QQ：",
        phoneNum:"电话：",
        userInfo: {}
    };
    $scope.activeNav = function() {
        if($scope.currentState == 'app.recent') {
            $scope.data.nav1 = true;
            $scope.data.nav2 = false;
            $scope.data.nav3 = false;
            $scope.data.nav4 = false;
        } else if($scope.currentState == 'app.release') {
            $scope.data.nav1 = false;
            $scope.data.nav2 = true;
            $scope.data.nav3 = false;
            $scope.data.nav4 = false;
        }else if($scope.currentState == 'app.myRelease') {
            $scope.data.nav1 = false;
            $scope.data.nav2 = false;
            $scope.data.nav3 = true;
            $scope.data.nav4 = false;
        }else if($scope.currentState == 'app.myCollect') {
            $scope.data.nav1 = false;
            $scope.data.nav2 = false;
            $scope.data.nav3 = false;
            $scope.data.nav4 = true;
        }else {
            //$scope.data.nav1 = true;
            //$scope.data.nav2 = false;
            //$scope.data.nav3 = false;
            //$scope.data.nav4 = false;
        }
    }
    $scope.getUserHead = function() {
        var data = JSON.stringify({
            "type": "get-user-info",
            "user_name": $scope.username
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                $scope.userInfo = data.data;
            }
        });
    }
    $scope.toggleLink = function() {
        $scope.head.state = !$scope.head.state;
    }
    $scope.getUserInfo = function() {
        var data = JSON.stringify({
            "type": "get-user-info",
            "user_name": $scope.username
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                $scope.modal.userInfo = data.data;
            }
        });
    }
    $scope.logout = function() {
        var data = JSON.stringify({
            "type": "logout"
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            $cookies.remove("username");
            $state.go('login');
        });
    }
    $scope.getUserHead();
    $scope.activeNav();
})
.controller('LoginCtrl', function ($scope, $state, apiServices, $cookies) {
    $scope.user = {
        username: "",
        usernameError:"",
        pwd: "",
        pwdError: "",
        pwdCheck: "",
        sno: "",
        school: "",
        phone: "",
        qqNum: "",
        validation: true
    }

    $scope.schoolList = [
        {value: "中国矿业大学（北京）"},{value: "清华大学"},{value: "北京大学"},{value: "中国农业大学"},{value: "北京林业大学"},{value: "北京语言大学"},{value: "北京科技大学"},{value: "中国地质大学(北京)"},
        {value: "北京航空航天大学"},{value: "中国人民大学"},{value: "北京交通大学"},{value: "中国石油大学（北京）"},{value: "北京邮电大学"},{value: "华北电力大学"},{value: "北京化工大学"},
        {value: "北京中医药大学"},{value: "北京师范大学"},{value: "北京外国语大学"},{value: "对外经济贸易大学"},{value: "中央财经大学"},{value: "中国政法大学"},{value: "中央民族大学"},
        {value: "中国人民公安大学"},{value: "北京协和医学院"},{value: "北京体育大学"},{value: "北京理工大学"},{value: "北京信息科技大学"},{value: "北京工商大学"},{value: "北京农学院"},
        {value: "北京联合大学"},{value: "北京工业大学"},{value: "北方工业大学"},{value: "首都医科大学"},{value: "首都师范大学"},{value: "首都经济贸易大学"},{value: "中国传媒大学"},
        {value: "国际关系学院"},{value: "中央美术学院"},{value: "中央戏剧学院"},{value: "中央音乐学院"},{value: "北京电子科技学院"},{value: "外交学院"},{value: "中国劳动关系学院"},
        {value: "中国青年政治学院"},{value: "中华女子学院"},{value: "北京建筑大学"},{value: "北京服装学院"},{value: "北京印刷学院"},{value: "北京石油化工学院"},
        {value: "首都体育学院"},{value: "北京第二外国语学院"},{value: "北京物资学院"},{value: "中国音乐学院"},{value: "北京舞蹈学院"},{value: "中国戏曲学院"},{value: "北京电影学院"},
        {value: "北京城市学院"},{value: "北京吉利学院"},{value: "首钢工学院"}
    ];
    $scope.state = "login";

    $scope.login = function () {
        if (!$scope.user.username) {
            $scope.user.usernameError = "请输入用户名";
            return false;
        }
        if (!$scope.user.pwd) {
            $scope.user.pwdError = "请输入密码";
            return false;
        }
        var data = JSON.stringify({"type": "login", "username": $scope.user.username, "password": $scope.user.pwd});
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                $scope.user.errorText = '用户名或密码错误';
                return;
            } else {
                $cookies.put("username", data.username);
                $state.go('app.recent');
            }
        });
    };

    $scope.goToReg = function () {
        $scope.state = "reg";
    }

    $scope.backToLogin = function () {
        $scope.state = "login";
    }

    $scope.reg = function () {
        if ($scope.user.username === '') {
            $scope.user.validation = false;
            $scope.user.errorReg = '请填写用户名';
        } else if ($scope.user.pwd === '') {
            $scope.user.validation = false;
            $scope.user.errorReg = '请填写密码';
        } else if ($scope.user.pwdCheck === '' || $scope.user.pwd !== $scope.user.pwdCheck) {
            $scope.user.validation = false;
            $scope.user.errorReg = '两次密码需填写一致';
        } else if ($scope.user.sno === '') {
            $scope.user.validation = false;
            $scope.user.errorReg = '请填写学号';
        } else if (!$scope.user.school) {
            $scope.user.validation = false;
            $scope.user.errorReg = '请选择学校';
        } else if ($scope.user.phone === '') {
            $scope.user.validation = false;
            $scope.user.errorReg = '请填写手机号';
        } else if ($scope.user.qqNum === '') {
            $scope.user.validation = false;
            $scope.user.errorReg = '请填写QQ号码';
        } else {
            var data = JSON.stringify({
                "type": "user-register",
                "userName": $scope.user.username,
                "password": $scope.user.pwd,
                "sno": $scope.user.sno,
                "school": $scope.user.school.value,
                "mobile": $scope.user.phone,
                "qq": $scope.user.qqNum
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    $scope.user.validation = false;
                    if (data.ret == '1102') {
                        $scope.user.errorReg = '用户已经注册';
                    } else if (data.ret == '1104') {
                        $scope.user.errorReg = '用户不存在';
                    } else {
                        $scope.user.errorReg = '注册信息有误';
                    }
                    // alert(data.info);
                    return;
                } else {
                    $cookies.put("username", $scope.user.username);
                    $scope.state = "login";
                    // $state.go('app.recent');
                }
            })
        }
    }
})

.controller('RecentCtrl', function ($scope, $state, $cookies, apiServices) {
    if(!$cookies.get("username")){
        $state.go('app.login');
    } else {
        $scope.username = $cookies.get("username");
    }
    $scope.barter = [];
    $scope.start = 0;
    $scope.numOfLoadContent = 16;
    $scope.category = 0;
    // $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    // $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    $scope.resize_image_url = "/media/resize_image/resize_";
    $scope.upload_image_url = "/media/upload_image/";
    $scope.loadmore = {
        zh:"加载更多",
        state:false
    }

    $scope.barter.loadContent = function () {
        $scope.end = $scope.start + $scope.numOfLoadContent;
        var data = JSON.stringify({
            "type": "recent-barters",
            "recent-start": $scope.start,
            "recent-end": $scope.end
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                if(data.data.length == $scope.numOfLoadContent) {
                    $scope.loadmore.state = true;
                } else {
                    $scope.loadmore.state = false;
                }
                $scope.barter = $scope.barter.concat(data.data);
                $scope.start = $scope.barter.length;
            }
        });
    }
    $scope.showdetail = function(barter) {
        $cookies.put("barterSha1",barter.barterSha1);
        $state.go('app.barterDetail');
    }
    $scope.toggleCollectBarter = function($event, barter) {
        $event.stopPropagation();
        if(barter.is_collected == 1) {
            var data = JSON.stringify({
                "type": "uncollect-barter",
                "barterSha1": barter.barterSha1,
                "userName": $scope.username
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    barter.is_collected = 0;
                }
            });
        } else {
            var data = JSON.stringify({
                "type": "collect-barter",
                "barterSha1": barter.barterSha1,
                "userName": $scope.username
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    barter.is_collected = 1;
                }
            });
        }
    }
    $scope.getUserInfo = function($event,barter) {
        $event.stopPropagation();
        var data = JSON.stringify({
            "type": "get-user-info",
            "user_name": barter.creatorName
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                $scope.modal.userInfo = data.data;
                $('#myModal').modal('show');
            }
        });
    }

    $scope.getBarterByCate = function(cate) {
        $scope.start = 0;
        $scope.end = $scope.start + $scope.numOfLoadContent;
        $scope.barter = [];
        if(cate == 0) {
            $scope.category = cate;
            var data = JSON.stringify({
                "type": "recent-barters",
                "recent-start": $scope.start,
                "recent-end": $scope.end
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    if(data.data.length == $scope.numOfLoadContent) {
                        $scope.loadmore.state = true;
                    } else {
                        $scope.loadmore.state = false;
                    }
                    $scope.barter = $scope.barter.concat(data.data);
                    $scope.start = $scope.barter.length;
                }
            });
        } else {
            $scope.category = cate;
            var data = JSON.stringify({
                "type": "get-barters-by-category",
                "category": cate.toString(),
                "recent-start": $scope.start,
                "recent-end": $scope.end
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    if(data.data.length == $scope.numOfLoadContent) {
                        $scope.loadmore.state = true;
                    } else {
                        $scope.loadmore.state = false;
                    }
                    $scope.barter = $scope.barter.concat(data.data);
                    $scope.start = $scope.barter.length;
                }
            });
        }
    }
    $scope.loadmoreBarter = function() {
        $scope.end = $scope.start + $scope.numOfLoadContent;
        if($scope.category == 0) {
            var data = JSON.stringify({
                "type": "recent-barters",
                "recent-start": $scope.start,
                "recent-end": $scope.end
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    if(data.data.length == $scope.numOfLoadContent) {
                        $scope.loadmore.state = true;
                    } else {
                        $scope.loadmore.state = false;
                    }
                    $scope.barter = $scope.barter.concat(data.data);
                    $scope.start = $scope.barter.length;
                }
            });
        } else {
            var data = JSON.stringify({
                "type": "get-barters-by-category",
                "category": $scope.category.toString(),
                "recent-start": $scope.start,
                "recent-end": $scope.end
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    if(data.data.length == $scope.numOfLoadContent) {
                        $scope.loadmore.state = true;
                    } else {
                        $scope.loadmore.state = false;
                    }
                    $scope.barter = $scope.barter.concat(data.data);
                    $scope.start = $scope.barter.length;
                }
            });
        }
    }
    $scope.barter.loadContent();
})

// .controller('ReleaseCtrl', function ($scope, $state, $cookies, apiServices) {
//         if(!$cookies.get("username")){
//             $state.go('app.login');
//         } else {
//             var data = JSON.stringify({
//                 "type": "collect-barter",
//                 "barterSha1": barter.barterSha1,
//                 "userName": $scope.username
//             });
//             var postdata = "data=" + data;
//             var responsePromise = apiServices.postRequest(postdata);
//             responsePromise.success(function (data, status, headers) {
//                 if (data.ret != '1101') {
//                     alert(data.info);
//                     return;
//                 } else {
//                     barter.is_collected = 1;
//                 }
//             });
//         }

//     $scope.getUserInfo = function($event,barter) {
//         $event.stopPropagation();
//         var data = JSON.stringify({
//             "type": "get-user-info",
//             "user_name": barter.creatorName
//         });
//         var postdata = "data=" + data;
//         var responsePromise = apiServices.postRequest(postdata);
//         responsePromise.success(function (data, status, headers) {
//             if (data.ret != '1101') {
//                 alert(data.info);
//                 return;
//             } else {
//                 $scope.modal.userInfo = data.data;
//                 $('#myModal').modal('show');
//             }
//         });
//     }
//     $scope.loadmoreBarter = function() {
//         var data = JSON.stringify({
//             "type": "recent-barters",
//             "recent-start": $scope.start,
//             "recent-end": $scope.end
//         });
//         var postdata = "data=" + data;
//         var responsePromise = apiServices.postRequest(postdata);
//         responsePromise.success(function (data, status, headers) {
//             if (data.ret != '1101') {
//                 alert(data.info);
//                 return;
//             } else {
//                 if(data.data.length == $scope.numOfLoadContent) {
//                     $scope.loadmore.state = true;
//                 } else {
//                     $scope.loadmore.state = false;
//                 }
//                 $scope.barter = $scope.barter.concat(data.data);
//                 $scope.start = $scope.barter.length;
//             }
//         });
//     }
//     $scope.barter.loadContent();
// })

.controller('MyReleaseCtrl', function ($scope, $state, $cookies, apiServices) {
    if(!$cookies.get("username")){
        $state.go('app.login');
    } else {
        $scope.username = $cookies.get("username");
    }
    $scope.loadmore = {
        zh:"加载更多",
        state:false
    }
    $scope.barter = [];
    $scope.start = 0;
    $scope.numOfLoadContent = 16;
    // $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    // $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    $scope.resize_image_url = "/media/resize_image/resize_";
    $scope.upload_image_url = "/media/upload_image/";
    $scope.voidState = {
        voidContent: "没有发布的物品！",
        loaded: false
    }

    $scope.barter.loadContent = function () {
        $scope.end = $scope.start + $scope.numOfLoadContent;
        var data = JSON.stringify({
            "type": "get-my-barters",
            "recent-start": $scope.start,
            "recent-end": $scope.end
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            $scope.voidState.loaded = true;
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                if(data.data.length == $scope.numOfLoadContent) {
                    $scope.loadmore.state = true;
                } else {
                    $scope.loadmore.state = false;
                }
                $scope.barter = $scope.barter.concat(data.data);
                $scope.start = $scope.barter.length;
            }
        });
    }
    $scope.showdetail = function(barter) {
        $cookies.put("barterSha1",barter.barterSha1);
        $state.go('app.barterDetail');
    }
    $scope.toggleCollectBarter = function($event, barter) {
        $event.stopPropagation();
        if(barter.is_collected == 1) {
            var data = JSON.stringify({
                "type": "uncollect-barter",
                "barterSha1": barter.barterSha1,
                "userName": $scope.username
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    barter.is_collected = 0;
                }
            });
        } else {
            var data = JSON.stringify({
                "type": "collect-barter",
                "barterSha1": barter.barterSha1,
                "userName": $scope.username
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    barter.is_collected = 1;
                }
            });
        }
    }
    $scope.getUserInfo = function($event,barter) {
        $event.stopPropagation();
        var data = JSON.stringify({
            "type": "get-user-info",
            "user_name": barter.creatorName
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                $scope.modal.userInfo = data.data;
                $('#myModal').modal('show');
            }
        });
    }
    $scope.loadmoreBarter = function() {
        $scope.end = $scope.start + $scope.numOfLoadContent;
        var data = JSON.stringify({
            "type": "recent-barters",
            "recent-start": $scope.start,
            "recent-end": $scope.end
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                if(data.data.length == $scope.numOfLoadContent) {
                    $scope.loadmore.state = true;
                } else {
                    $scope.loadmore.state = false;
                }
                $scope.barter = $scope.barter.concat(data.data);
                $scope.start = $scope.barter.length;
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
    $scope.loadmore = {
        zh:"加载更多",
        state:false
    }
    $scope.barter = [];
    $scope.start = 0;
    $scope.numOfLoadContent = 16;
    // $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    // $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    $scope.resize_image_url = "/media/resize_image/resize_";
    $scope.upload_image_url = "/media/upload_image/";
    $scope.voidState = {
        voidContent: "没有收藏的物品！",
        loaded: false
    }
    $scope.barter.loadContent = function () {
        $scope.end = $scope.start + $scope.numOfLoadContent;
        var data = JSON.stringify({
            "type": "collected-barters",
            "recent-start": $scope.start,
            "recent-end": $scope.end
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            $scope.voidState.loaded = true;
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                if(data.data.length == $scope.numOfLoadContent) {
                    $scope.loadmore.state = true;
                } else {
                    $scope.loadmore.state = false;
                }
                $scope.barter = $scope.barter.concat(data.data);
                $scope.start = $scope.barter.length;
            }
        });
    }
    $scope.showdetail = function(barter) {
        $cookies.put("barterSha1",barter.barterSha1);
        $state.go('app.barterDetail');
    }
    $scope.toggleCollectBarter = function($event, barter) {
        $event.stopPropagation();
        if(barter.is_collected == 1) {
            var data = JSON.stringify({
                "type": "uncollect-barter",
                "barterSha1": barter.barterSha1,
                "userName": $scope.username
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    barter.is_collected = 0;
                }
            });
        } else {
            var data = JSON.stringify({
                "type": "collect-barter",
                "barterSha1": barter.barterSha1,
                "userName": $scope.username
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    barter.is_collected = 1;
                }
            });
        }
    }
    $scope.getUserInfo = function($event,barter) {
        $event.stopPropagation();
        var data = JSON.stringify({
            "type": "get-user-info",
            "user_name": barter.creatorName
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                $scope.modal.userInfo = data.data;
                $('#myModal').modal('show');
            }
        });
    }
    $scope.loadmoreBarter = function() {
        $scope.end = $scope.start + $scope.numOfLoadContent;
        var data = JSON.stringify({
            "type": "recent-barters",
            "recent-start": $scope.start,
            "recent-end": $scope.end
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                if(data.data.length == $scope.numOfLoadContent) {
                    $scope.loadmore.state = true;
                } else {
                    $scope.loadmore.state = false;
                }
                $scope.barter = $scope.barter.concat(data.data);
                $scope.start = $scope.barter.length;
            }
        });
    }
    $scope.barter.loadContent();
})

.controller('BarterDetailCtrl', function ($scope, $state, $cookies, apiServices) {
    if(!$cookies.get("username")){
        $state.go('app.login');
    } else {
        $scope.username = $cookies.get("username");
    }
    // $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    // $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    $scope.resize_image_url = "/media/resize_image/resize_";
    $scope.upload_image_url = "/media/upload_image/";
    $scope.barter = {};
    $scope.barterSha1 = $cookies.get("barterSha1");
    $scope.zh = {
        time: "发布时间：",
        description: "物品描述:"
    }
    $scope.categoryList = [
        {
            value:0,
            name:"在售"
        },
        {
            value:1,
            name:"交易中"
        },
        {
            value:2,
            name:"下架"
        }
    ];
    $scope.loadContent = function () {
        var data = JSON.stringify({
            "type": "get-barter-info",
            "barterSha1": $scope.barterSha1
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                $scope.barter = data.data;
                switch(data.data.saleState) {
                    case 0:
                        $scope.barter.barterState = '在售';
                        break;
                    case 1:
                        $scope.barter.barterState = '交易中';
                        break;
                    case 2:
                        $scope.barter.barterState = '下架';
                        break;
                    default:
                        break;
                }
            }
        });
    }

    $scope.deleteBarter = function() {
        $('#deleteModal').modal('show');
    }
    $scope.delete = function() {
        var data = JSON.stringify({
            "type": "delete-barter",
            "barterSha1": $scope.barterSha1
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                $scope.data.nav1 = true;
                $scope.data.nav2 = false;
                $scope.data.nav3 = false;
                $scope.data.nav4 = false;
                $state.go('app.recent');
            }
        });
    }
    $scope.changeBarterState = function (state) {
        $scope.barter.saleState = state;
        switch(state) {
            case 0:
                $scope.barter.barterState = '在售';
                break;
            case 1:
                $scope.barter.barterState = '交易中';
                break;
            case 2:
                $scope.barter.barterState = '下架';
                break;
            default:
                break;
        }
        var data = JSON.stringify({
            "type": "change-salestate",
            "barterSha1": $scope.barterSha1,
            'saleState': state,
            'buyers': $scope.username
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                // alert(data.info);
                return;
            } else {
                if ($scope.barter.creatorName != $scope.username) {
                    var data = JSON.stringify({
                        "type": "get-user-info",
                        "user_name": $scope.barter.creatorName
                    });
                    var postdata = "data=" + data;
                    var responsePromise = apiServices.postRequest(postdata);
                    responsePromise.success(function (data, status, headers) {
                        if (data.ret != '1101') {
                            // alert(data.info);
                            return;
                        } else {
                            $scope.modal.userInfo = data.data;
                            $('#myModal').modal('show');
                        }
                    });
                }
                $scope.loadContent();
            }
        });
    }
    $scope.toggleCollectBarter = function($event, barter) {
        $event.stopPropagation();
        if(barter.is_collected == 1) {
            var data = JSON.stringify({
                "type": "uncollect-barter",
                "barterSha1": barter.barterSha1,
                "userName": $scope.username
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    $scope.upload_data = {
                        username: $scope.username,
                        barterSha1: data.barterSha1
                    };
                    //$scope.barter.flowObj.upload();
                    barter.is_collected = 0;
                }
            });
        } else {
            var data = JSON.stringify({
                "type": "collect-barter",
                "barterSha1": barter.barterSha1,
                "userName": $scope.username
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    barter.is_collected = 1;
                }
            });
        }
    }
    $scope.getUserInfo = function($event, barter) {
        $event.stopPropagation();
        if (barter.buyers == $scope.username) {
            var data = JSON.stringify({
                "type": "get-user-info",
                "user_name": barter.creatorName
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    $scope.modal.userInfo = data.data;
                    $('#myModal').modal('show');
                }
            });
        }
    }
    $scope.loadContent();
})

.controller('UserInfoCtrl', function ($scope, $state, $cookies, apiServices) {
    if(!$cookies.get("username")){
        $state.go('app.login');
    } else {
        $scope.username = $cookies.get("username");
    }
    $scope.creatorName = $cookies.get("user");
    var data = JSON.stringify({
        "type": "get-user-info",
        "user_name": $scope.creatorName
    });
    var postdata = "data=" + data;
    var responsePromise = apiServices.postRequest(postdata);
    responsePromise.success(function (data, status, headers) {
        if (data.ret != '1101') {
            // alert(data.info);
            return;
        } else {
            $scope.modal.userInfo = data.data;
        }
    });
})
.controller('ReleaseCtrl', function ($scope, $state, $cookies, apiServices) {
    if(!$cookies.get("username")){
        $state.go('app.login');
    } else {
        $scope.username = $cookies.get("username");
    }
    $scope.barter = {};
    $scope.validation = {
        state: true,
        errorText: ''
    }
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
        },
        {
            value:7,
            name:"生活用品"
        },
        {
            value:8,
            name:"其他"
        }
    ];
    $scope.release = function () {
        if (!$scope.barter.title) {
            $scope.validation.state = false;
            $scope.validation.errorText = '请填写标题';
            return;
        } else if (!$scope.barter.category) {
            $scope.validation.state = false;
            $scope.validation.errorText = '请选择物品类别';
            return;
        } else if (!$scope.barter.description) {
            $scope.validation.state = false;
            $scope.validation.errorText = '请填写描述信息';
            return;
        } else if ($scope.barter.flowObj.files.length === 0) {
            $scope.validation.state = false;
            $scope.validation.errorText = '至少上传一张描述图片';
            return;
        } else {
            var data = JSON.stringify({
                "type": "create-barter",
                "userName":$scope.username,
                "title":$scope.barter.title,
                "category":$scope.barter.category.toString(),
                "description":$scope.barter.description
            });
            var postdata = "data=" + data;
            var responsePromise = apiServices.postRequest(postdata);
            responsePromise.success(function (data, status, headers) {
                if (data.ret != '1101') {
                    // alert(data.info);
                    return;
                } else {
                    $scope.barterSha1 = data.barterSha1;
                    $scope.barter.flowObj.opts.query = {
                        userName : $scope.username,
                        barterSha1 : $scope.barterSha1
                    };
                    $scope.barter.flowObj.upload();
                    $scope.fileNum = $scope.barter.flowObj.files.length;
                }
            });
        }
    }
    $scope.fileSuccess = function($file, $message, $flow) {
        if ($scope.fileNum !== 1) {
            $scope.fileNum --;
        } else {
        // $scope.barter.title = '';
        // $scope.barter.description = '';
        // $scope.barter.category = '';
        // $scope.barter.flowObj.files.length = 0;
        $scope.data.nav1 = true;
        $scope.data.nav2 = false;
        $scope.data.nav3 = false;
        $scope.data.nav4 = false;
        $state.go('app.recent');
        }
    }
})
