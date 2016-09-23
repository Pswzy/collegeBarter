angular.module('starter', ['starter.controllers', 'starter.directives', 'starter.services', 'ui.router', 'flow', 'ngCookies'])

    //.run(['$rootScope', function($rootScope, $interpolateProvider) {
    //
    //
    //
    //}])
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })

    .config(['flowFactoryProvider', function (flowFactoryProvider) {
        flowFactoryProvider.defaults = {
            permanentErrors: [404, 500, 501],
            singleFile:false,
            chunkSize:1*1024*1024,
            forceChunkSize:false,
            simultaneousUploads:3,
            fileParameterName:'file',
            query:{},
            withCredentials:false,
            method:'multipart',
            testMethod:'GET',
            uploadMethod:'POST',
            allowDuplicateUploads:false,
            testChunks:false
        };
    }])

    //.config(function ($httpProvider) {
    //    $httpProvider.interceptors.push('httpRequestInterceptor');
    //})

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
            .state('app',{
                url: '/app',
                abstract: true,
                cache: false,
                templateUrl: 'head.html',
                controller: 'AppCtrl'
            })
            .state('app.recent', {
                url: '/recent',
                views:{
                    'menuContent':{
                        templateUrl: 'recent.html',
                        controller: 'RecentCtrl'
                    }
                }
            })
            .state('app.release', {
                url: '/release',
                views:{
                    'menuContent':{
                        templateUrl: 'release.html',
                        controller: 'ReleaseCtrl'
                    }
                }
            })
            .state('app.myRelease', {
                url: '/myRelease',
                views:{
                    'menuContent':{
                        templateUrl: 'myRelease.html',
                        controller: 'MyReleaseCtrl'
                    }
                }
            })
            .state('app.myCollect', {
                url: '/myCollect',
                views:{
                    'menuContent':{
                        templateUrl: 'myCollect.html',
                        controller: 'MyCollectCtrl'
                    }
                }
            })

        $urlRouterProvider.otherwise('/login');
    });
