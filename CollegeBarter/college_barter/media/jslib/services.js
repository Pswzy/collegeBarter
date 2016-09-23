/**
 * @file: serivceÎÄ¼þ
 * @author: Pengcheng Song (spc@data.me), Yifeng Li
 */

angular.module('starter.services', [])

.factory('apiServices', function($http) {

        return {
            //getToken: function () {
            //    if ($cookies.get('x-auth-token') == "null" || $cookies.get('x-auth-token') == null || $cookies.get('x-auth-token') == "") {
            //        $cookies.put("x-auth-token", $cookies.get('SESSION'));
            //    }
            //},

            postRequest: function (data) {
                var req = {
                    method: 'POST',
                    url: '/request/',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    data: data
                };
                return $http(req);
            },
            getBarter: function (data) {
                var req = {
                    method: 'POST',
                    url: '/request/',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    data: data
                };
                return $http(req);
            },
            getBarterByGroup: function (data) {
                var req = {
                    method: 'POST',
                    url: '/request/',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    data: data
                };
                return $http(req);
            },
        }
});