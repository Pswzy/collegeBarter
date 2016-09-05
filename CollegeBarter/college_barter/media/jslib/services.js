/**
* @file: serivce文件
* @author: Pengcheng Song (spc@data.me), Yifeng Li
*/

angular.module('starter.services', [])

.factory('apiServices', function($http, $cookies, dbcConfig) {
    
    return {
		getToken: function(){
			if($cookies.get('x-auth-token') == "null" || $cookies.get('x-auth-token') == null || $cookies.get('x-auth-token') == ""){
				$cookies.put("x-auth-token",$cookies.get('SESSION'));
			}
		},

        accountBlurService:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'checkAccount',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: "account=" + data.account,
                xhrFields: {
                    withCredentials: true
                }            
            };
            return $http(req);
        },

        addDoc:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dir/add',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        addPV: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.staticsServer + 'addpv',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        createBase: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'base/createfromtpl',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        createDirInBase: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dir/createinbase',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);            
        },

        createDirInDir: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dir/createsubdir',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);            
        },

        createDocInBase: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'doc/createinbase',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        createDocInDir: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'doc/createindir',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        createTmp: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'createbasetpl',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        deleteDatabase:function(data){
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dropbase',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        deleteDirInBase: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dir/deletedirinbase',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);            
        },

        deleteDoc:function(data) {
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'doc/droplist',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        editAuth:function(data){
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'permission/update',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
            };
            return $http(req);
        },

        editDirList:function(data){
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dirlist/edit',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                 },
                data: data,
                xhrFields: {
                    withCredentials: true
                 }
            };
            return $http(req);
        },

        editDir:function(data){
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dir/edit',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                 },
                data: data,
                xhrFields: {
                    withCredentials: true
                 }
            };
            return $http(req);
        },

        editDocList:function(data){
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'doclist/edit',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                 },
                data: data,
                xhrFields: {
                    withCredentials: true
                 }
            };
            return $http(req);
        },

        emailProving:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'activateAccount',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-auth-token':$cookies.get('x-auth-token'),
                },
                data: "authkey=" + data.authkey,
                xhrFields: {
                    withCredentials: true
                }            
            };
            return $http(req);
        },

        fav: function(data){
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'fav',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        unFav: function(data){
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'unfav',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        getAuth: function(data){
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'permission/infores',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        getBase: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'base',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }   
            };
            return $http(req);
        },

        getSet: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'set/info',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }   
            };
            return $http(req);
        },

        getBaseList: function(data){
             var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'baselist',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
             };
            return $http(req);
        },

        getDir: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dir',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }   
            };
            return $http(req);
        },

        getDirList: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dirlist',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);            
        },

        getDoc: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'doc',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
            };
            return $http(req);
        },

        getDocList: function(data){
             var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'doclist',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
             };
            return $http(req);
        },

        getDocListNotInDir: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'doclist/outofdir',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);            
        },

        getNameList: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'getResName',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);            
        },

        getFieldEditor: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + '/fieldeditor',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);            
        },

        getLoginUser:function(){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'usersession',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);            
        },

        getSpace:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'space',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        getTmpList:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'templist',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
             };
            return $http(req);
        },

        getUserSpace:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'space/user/get',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        getUserByUid:function(data){
                var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'user',
                headers: {
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        getUserByNickname:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'nicknamesuggest',
                headers: {
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        getWikiBase:function(data){
              var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'wikilist',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
             };
            return $http(req);
        },

        login:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'login',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
            };
            return $http(req);
        },

        loginWx:function(data){
              var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'loginbywechat',
                headers: {
                    'Content-Type': 'application/json'
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
             };
            return $http(req);
        },

        logout:function(){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'logout',
                headers: {
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        postFile: function() {
            // 接收上传文件的后台地址 
            var url = dbcConfig.uploadServer + "uploadandgetURL";
            // XMLHttpRequest 对象
            var xhr = new XMLHttpRequest();
            xhr.open("post", url, true);
            return xhr;
        },

        register: function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'account/register',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
            };
            return $http(req);            
        },

        removeDoc:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dir/remove',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        reset:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'resetPassWithForgot',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: "key="+data.key+"&pass="+data.pass,
                xhrFields: {
                    withCredentials: true
                }            
             };
             return $http(req);
        },

        searchAPI:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'search2',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        searchDoc:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'docsearch',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': $cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        sendCode:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'account/sendcode',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
            };
            return $http(req);
        },

        updateBase: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'base/edit',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }    
            };
            return $http(req);            
        },

        updateDir: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'dir/edit',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }    
            };
            return $http(req);            
        },

        updateDoc: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'doc/edit',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }    
            };
            return $http(req);            
        },

        updateForm: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'base/editform',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }    
            };
            return $http(req);            
        },

        updateSet: function(data) {
            var req = {
                method: 'POST',
                url: dbcConfig.apiServer + 'set/edit',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },        
                data: data,
                xhrFields: {
                    withCredentials: true
                }    
            };
            return $http(req);            
        },

        updateUser: function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'user/update',
                data : data,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        updateUserPwd: function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'account/updateps',
                data : data,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                xhrFields: {
                    withCredentials: true
                }
            };
            return $http(req);
        },

        validateCode:function(data){
            var req = {
                method: 'POST',
                url: dbcConfig.accountServer + 'account/checkcode',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token':$cookies.get('x-auth-token')
                },
                data: data,
                xhrFields: {
                    withCredentials: true
                }            
            };
            return $http(req);
        }
    }
})

.factory('editServices', function($http, $cookies, $ionicPopup, apiServices) {

    var editServices = {};

    editServices.actionQuery = [];
    editServices.id = '';
    editServices.type = '';

    editServices.setId = function (id) {
        editServices.id = id;
    };

    editServices.clearAction = function () {
        editServices.actionQuery = [];
    };

    editServices.setType = function (type) {
        editServices.type = type;
    };
    
    editServices.addAction = function (action) {
        editServices.actionQuery.push(action);
    };

    editServices.updateToServer = function() {
        if (editServices.actionQuery.length > 0) {
            var data = {
                "id": editServices.id,
                "lang": "zh",
                "values": editServices.actionQuery
            };
            if (editServices.type == 'doc') {  
                var responsePromise = apiServices.updateDoc(data);
            }
            else if (editServices.type == 'dir') {
                var responsePromise = apiServices.updateDir(data);
            }
            else if (editServices.type == 'base') {
                var responsePromise = apiServices.updateBase(data);
            }
            else if (editServices.type == 'set') {
                var responsePromise = apiServices.updateSet(data);
            }
            responsePromise.success(function(data, status, headers, config) {
                editServices.actionQuery = [];
            });
        }
    };

    return editServices;
})

.factory('deleteServices', function($http, $cookies, $state, $rootScope, $ionicPopup, apiServices) {
    var deleteServices = {};

    deleteServices.deleteItem = function(type, id){
        var confirmPopup = $ionicPopup.confirm({
            title: '确定删除',
            template: '确定要删除吗？',
            cancelText: '取消',
            okText: '确定'
        }).then(function(res) {
            if(res) {
                if(type == "base"){
                    var data = {
                        "baseId": id,
                     };
                    var temp = id;
                    var responsePromise = apiServices.deleteDatabase(data);
                    responsePromise.success(function(data, status, headers, config) {
                        $state.go('home.discover');
                    });         
                }

                else if(type == "doc"){
                    var data = {
                        docIdList: [id]
                    }
                    var temp = id;
                    var responsePromise = apiServices.deleteDoc(data);
                    responsePromise.success(function(data, status, headers, config) {

                        if($rootScope.dbcParams.currentBase){
                            $state.go('app.baseDocs', {baseid:$rootScope.dbcParams.currentBase});
                        }
                        else{
                            $state.go('home.discover');
                        }
                        
                    });  
                }

                else if(type == "dir"){
                        var data = {
                            "id": id,
                            "lang": "zh",
                            "type": "detail"
                        };
                        var responsePromise = apiServices.getDir(data);
                        responsePromise.success(function(data, status, headers, config) {
                            var tempBaseId = data.prop.baseId;
                            var data = {
                                dirId: id,
                                baseId: tempBaseId
                            }
                            var responsePromise = apiServices.deleteDirInBase(data);

                            responsePromise.success(function(data, status, headers, config) {
                                $state.go('app.baseDocs', {baseid:tempBaseId});   
                            })
                        });
                }

            } else {
                console.log('取消');
            }
        });
    };

   return deleteServices;
})

.service('formeditServices', function($ionicModal, parseServices, apiServices) {
    //编辑字段函数
    var formeditServices = {};

    formeditServices.fieldForm = {};

    formeditServices.fieldJson = {
        name:'{"fid":1,"name":{"zh":"字段名"},"type":"name","prop":{"description":{"zh":""},"info":{"zh":""},"placeholder":{"zh":""},"default_value":"","required":true,"uniqueness":false,"value_type":"string","filter_enable":true,"trans_type":"trans","prior_view":true,"max_record":1,"word_length":0,"min_length":1,"max_length":20}}',
        doc_img:'{"fid":2,"name":{"zh":"图片"},"type":"doc_img","prop":{"description":{"zh":""},"info":{"zh":""},"default_value":"","required":false,"value_type":"string","trans_type":"uni","prior_view":true}}',
        text:'{"fid":3,"name":{"zh":"单行文本框"},"type":"text","prop":{"description":{"zh":""},"info":{"zh":""},"placeholder":{"zh":""},"default_value":"","required":false,"uniqueness":false,"value_type":"string","filter_enable":true,"trans_type":"trans","prior_view":false,"min_record":0,"max_record":1,"word_length":0,"min_length":0,"max_length":50}}',
        textarea:'{"fid":4,"name":{"zh":"多行文本框"},"type":"textarea","prop":{"description":{"zh":""},"info":{"zh":""},"placeholder":{"zh":""},"required":false,"value_type":"string","filter_enable":true,"trans_type":"trans","prior_view":false,"min_record":0,"max_record":1,"word_length":0,"min_length":0,"max_length":200}}',
        number:'{"fid":5,"name":{"zh":"数字"},"type":"number","prop":{"description":{"zh":""},"info":{"zh":""},"placeholder":{"zh":""},"default_value":0,"required":false,"uniqueness":false,"value_type":"number","filter_enable":true,"trans_type":"uni","number_type":"int","prior_view":false,"min_record":0,"max_record":1}}',
        toggle:'{"fid":6,"name":{"zh":"开关"},"type":"toggle","prop":{"description":{"zh":""},"info":{"zh":""},"default_value":false,"required":false,"value_type":"boolean","filter_enable":true,"trans_type":"uni","prior_view":false}}',
        link:'{"fid":7,"name":{"zh":"网址"},"type":"link","prop":{"description":{"zh":""},"info":{"zh":""},"placeholder":{"zh":""},"default_value":"","required":false,"uniqueness":false,"value_type":"string","trans_type":"uni","prior_view":false,"min_record":0,"max_record":1}}',
        radio:'{"fid":8,"name":{"zh":"单选"},"type":"radio","prop":{"description":{"zh":""},"info":{"zh":""},"default_value":-1,"required":false,"value_type":"number","filter_enable":true,"trans_type":"uni","prior_view":false,"value_list":[{"val":0,"zh":"单选选项1"},{"val":1,"zh":"单选选项2"},{"val":2,"zh":"单选选项3"}]}}',
        checkbox:'{"fid":9,"name":{"zh":"多选"},"type":"checkbox","prop":{"description":{"zh":""},"info":{"zh":""},"default_value":-1,"required":false,"value_type":"number","filter_enable":true,"trans_type":"uni","prior_view":false,"value_list":[{"val":0,"zh":"多选选项1"},{"val":1,"zh":"多选选项2"},{"val":2,"zh":"多选选项3"}]}}',
        selectbox:'{"fid":10,"name":{"zh":"本地下拉框"},"type":"selectbox","prop":{"description":{"zh":""},"info":{"zh":""},"default_value":-1,"required":false,"value_type":"number","filter_enable":true,"trans_type":"uni","prior_view":false,"min_record":0,"max_record":1,"ref_edit":"strict","value_list":[{"val":0,"zh":"下拉选项1"},{"val":1,"zh":"下拉选项2"},{"val":2,"zh":"下拉选项3"}]}}',
        ref_doc:'{"fid":11,"name":{"zh":"名称引用输入框"},"type":"ref_doc","prop":{"description":{"zh":""},"info":{"zh":""},"placeholder":{"zh":""},"required":false,"value_type":"string","filter_enable":true,"trans_type":"auto","prior_view":false,"min_record":0,"max_record":1,"ref_edit":"strict","target_base":"","target_dir":""},"fields":[{"fid":1101,"type":"text","name":{"zh":"引用字段值"},"prop":{"required":true,"value_type":"string","filter_enable":true,"trans_type":"trans","max_record":1}},{"fid":1102,"type":"ref_id","name":{"zh":"引用源"},"prop":{"required":false,"value_type":"string","filter_enable":false,"trans_type":"uni","max_record":1}}]}',
        ref_selectbox:'{"fid":12,"name":{"zh":"目录引用下拉框"},"type":"ref_selectbox","prop":{"description":{"zh":""},"info":{"zh":"目录引用下拉框"},"required":false,"prior_view":false,"min_record":0,"max_record":1,"ref_edit":"strict","target_base":"","target_dir":"","max_level":5,"min_level":1},"fields":[{"fid":2,"name":{"zh":"下拉框1"},"type":"ref_id","prop":{"required":false,"value_type":"string","filter_enable":true,"trans_type":"uni","max_record":1,"ref_type":"dir","target_base":"","target_dir":""}}]}',
        combo:'{"fid":12,"name":{"zh":"组合项"},"type":"combo","prop":{"description":{"zh":""},"info":{"zh":""},"required":false,"uniqueness":false,"filter_enable":true,"prior_view":false,"min_record":0,"max_record":1},"fields":[]}'
    };
    //添加字段时操作的字段列表
    formeditServices.opFields = [];

    //表单操作指针
    formeditServices.opForm = {};

    formeditServices.setForm = function(form){
        formeditServices.opForm = form;
    }
    
    //新增一个字段
    formeditServices.addField = function(fields){
        formeditServices.opFields = fields;
        formeditServices.addModal.show();
    };

    //创建新增字段弹窗
    formeditServices.createAddModal = function(scope){
        $ionicModal.fromTemplateUrl('templates/formAddFieldModal.html', {  
            scope: scope,
            animation: 'slide-in-left'  
        }).then(function(modal) {  
            scope.addModal = modal;
            formeditServices.addModal = modal;
        });

        scope.closeAddModal = function(){
            scope.addModal.hide();
        };

        scope.updateAdd = function(){
            if (scope.data.field.type && scope.data.field.name) {
                var tempfield = JSON.parse(formeditServices.fieldJson[scope.data.field.type]);
                tempfield.name['zh'] = scope.data.field.name;
                scope.data.jsonform.last_fid ++;
                if (scope.data.field.type == "ref_doc") {
                    tempfield.fields[0].fid = scope.data.jsonform.last_fid;
                    scope.data.jsonform.last_fid ++;
                    tempfield.fields[1].fid = scope.data.jsonform.last_fid;
                    scope.data.jsonform.last_fid ++;
                }
                tempfield.fid = scope.data.jsonform.last_fid;
                formeditServices.opFields.push(tempfield);
            }
            scope.addModal.hide();
        };
    }

    //编辑一个字段
    formeditServices.editField = function(scope){
        scope.createModal = function(){
            scope.schema = parseServices.fieldformToSchema(formeditServices.fieldForm[scope.val.type], scope.val);
            $ionicModal.fromTemplateUrl('templates/formEditModal.html', {  
                scope: scope,
                animation: 'slide-in-left'
            }).then( function(modal){
                scope.modal = modal;
                scope.modal.show();
            });
        };

        scope.closeModal = function(){
            scope.modal.hide();
        };

        scope.update = function(){
            parseServices.fieldschemaToField(scope.schema,scope.val);
            scope.modal.hide();
        };

        if (!formeditServices.fieldForm[scope.val.type]){
            data = {
                "type":scope.val.type
            };
            var responsePromise = apiServices.getFieldEditor(data);
            responsePromise.success(function(data, status, headers, config) {
                formeditServices.fieldForm[scope.val.type] = data;
                scope.createModal();
            });
        }
        else {
            scope.createModal();
        }
    };

    //删除一个字段
    formeditServices.removeField = function(fid) {

        var spliceField = function (spfields, spfid) {
            for (var i = spfields.length-1; i >= 0; i--) {
                if (spfields[i].fid == spfid ) {
                    spfields.splice(i,1);
                    return;
                }
                else if (spfields[i].type == 'combo') {
                    spliceField(spfields[i].fields, spfid);
                }
            }
        }
        spliceField(formeditServices.opForm.fields, fid);
    }
    return formeditServices;
})

.service('userServices', function(apiServices, pageCacheServices, $state) {

    var loginUser = null;
    this.setLoginUser = function (user) {
        loginUser = user;
    }
    this.getLoginUser = function () {
        this.checkLogin();
        return loginUser;
    }
    this.clearLoginUser = function () {
        loginUser = null;
    }
    this.checkLogin = function (user){
        if (loginUser) {
            return true;
        }
        var responsePromise = apiServices.getLoginUser();
        responsePromise.success(function(data, status, headers, config) {
            if(data.status == 1){
                loginUser = data.json;
                return true;
            }else{
                pageCacheServices.cachePage($state);
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx842aad37a02d49d5&redirect_uri=http%3A%2F%2Fm.factube.com%2Faction%2FwxCallback&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
                    //window.location = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx98f6e23d3e2f4373&redirect_uri=http%3A%2F%2Fwww.factube.com%2F%23%2Faction%2FwxCallback&response_type=code&scope=snsapi_login&state=123#wechat_redirect";
                }
                else
                {
                    $state.go('action.dologin');
                }
                return false;
            }
        });
    }
})

.factory('dirServices', function() {
    var dirServices = {};
    dirServices.dirTree = {};
    return dirServices;
})

.service('pageCacheServices', function() {
    var pageStack = [];
    
    this.cachePage = function(state) {
        var tempState = {
            name: state.current.name,
            params: state.params
        }
        pageStack.push(tempState);
    }

    this.lastPage = function() {
        return pageStack.pop();
    }
    
    this.cachedPages = function() {
        return pageStack.length;
    }
})

.filter('nl2br', function($sce){
    return function(msg,is_xhtml) { 
        var is_xhtml = is_xhtml || true;
        var breakTag = (is_xhtml) ? '<br />' : '<br>';
        var msg = (msg + '').replace(/([^>rn]?)(rn|nr|r|n)/g, '$1'+ breakTag +'$2');
        return $sce.trustAsHtml(msg);
    }
});