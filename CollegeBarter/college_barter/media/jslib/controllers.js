'use strict';
angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $state, $cookies, apiServices) {
    if(!$cookies.get("username")){
        $state.go('app.login');
    } else {
        $scope.username = $cookies.get("username");
    }
    $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    // $scope.resize_image_url = "/media/resize_image/resize_";
    // $scope.upload_image_url = "/media/upload_image/";
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
                alert(data.info);
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
                alert(data.info);
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
                alert(data.info);
                return;
            } else {
                $cookies.put("username", data.username);
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
    if(!$cookies.get("username")){
        $state.go('app.login');
    } else {
        $scope.username = $cookies.get("username");
    }
    $scope.barter = [];
    $scope.start = 0;
    $scope.numOfLoadContent = 10;
    $scope.end = $scope.start + $scope.numOfLoadContent;
    $scope.category = 0;
    $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    // $scope.resize_image_url = "/media/resize_image/resize_";
    // $scope.upload_image_url = "/media/upload_image/";
    $scope.loadmore = {
        zh:"加载更多",
        state:false
    }

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
                    alert(data.info);
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
                    alert(data.info);
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
                alert(data.info);
                return;
            } else {
                $scope.modal.userInfo = data.data;
                $('#myModal').modal('show');
            }
        });
    }

    $scope.getBarterByCate = function(cate) {
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
                    alert(data.info);
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
                "category": cate,
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
                    alert(data.info);
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
                "category": $scope.category,
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

.controller('ReleaseCtrl', function ($scope, $state, $cookies, apiServices) {
        if(!$cookies.get("username")){
            $state.go('app.login');
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
                    alert(data.info);
                    return;
                } else {
                    barter.is_collected = 1;
                }
            });
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
                alert(data.info);
                return;
            } else {
                $scope.modal.userInfo = data.data;
                $('#myModal').modal('show');
            }
        });
    }
    $scope.loadmoreBarter = function() {
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
    $scope.numOfLoadContent = 10;
    $scope.end = $scope.start + $scope.numOfLoadContent;
    $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    // $scope.resize_image_url = "/media/resize_image/resize_";
    // $scope.upload_image_url = "/media/upload_image/";
    $scope.voidContent = "没有发布的物品！"

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
                    alert(data.info);
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
                    alert(data.info);
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
                alert(data.info);
                return;
            } else {
                $scope.modal.userInfo = data.data;
                $('#myModal').modal('show');
            }
        });
    }
    $scope.loadmoreBarter = function() {
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
    $scope.numOfLoadContent = 10;
    $scope.end = $scope.start + $scope.numOfLoadContent;
    $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    // $scope.resize_image_url = "/media/resize_image/resize_";
    // $scope.upload_image_url = "/media/upload_image/";
    $scope.voidContent = "没有收藏的物品！"
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
                    alert(data.info);
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
                    alert(data.info);
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
                alert(data.info);
                return;
            } else {
                $scope.modal.userInfo = data.data;
                $('#myModal').modal('show');
            }
        });
    }
    $scope.loadmoreBarter = function() {
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
    $scope.resize_image_url = "http://collegebarter.cn/media/resize_image/resize_";
    $scope.upload_image_url = "http://collegebarter.cn/media/upload_image/";
    // $scope.resize_image_url = "/media/resize_image/resize_";
    // $scope.upload_image_url = "/media/upload_image/";
    $scope.barter = {};
    $scope.barterSha1 = $cookies.get("barterSha1");
    $scope.zh = {
        time: "发布时间：",
        description: "物品描述:"
    }

    $scope.barter.loadContent = function () {
        var data = JSON.stringify({
            "type": "get-barter-info",
            "barterSha1": $scope.barterSha1
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                alert(data.info);
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
                        $scope.barter.barterState = '已售出';
                        break;
                    default:
                        break;
                }
            }
        });
    }
    $scope.changeBarterState = function () {
        var data = JSON.stringify({
            "type": "change-salestate",
            "barterSha1": $scope.barterSha1,
            'saleState': 1
        });
        var postdata = "data=" + data;
        var responsePromise = apiServices.postRequest(postdata);
        responsePromise.success(function (data, status, headers) {
            if (data.ret != '1101') {
                alert(data.info);
                return;
            } else {
                $scope.barter.saleState = 1;
                $scope.barter.barterState = '交易中'
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
                    alert(data.info);
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
                    alert(data.info);
                    return;
                } else {
                    barter.is_collected = 1;
                }
            });
        }
    }
    $scope.barter.loadContent();
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
            alert(data.info);
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
                $scope.barter.flowObj.opts.query = {
                    userName : $scope.username,
                    barterSha1 : $scope.barterSha1
                };
                console.log($scope.barter.flowObj);
                $scope.barter.flowObj.upload();
            }
        });
    }
})
