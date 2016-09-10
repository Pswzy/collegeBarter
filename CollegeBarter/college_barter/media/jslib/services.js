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

            login: function (data) {
                var req = {
                    method: 'POST',
                    url: '/request/',
                    data: data
                };
                return $http(req);
            },
        }
});