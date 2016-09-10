angular.module('starter', ['starter.controllers', 'starter.directives', 'starter.services', 'ui.router'])

    //.run(['$rootScope', function($rootScope, $interpolateProvider) {
    //
    //
    //
    //}])
    .config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })

    //.config(function ($httpProvider) {
    //    $httpProvider.interceptors.push('httpRequestInterceptor');
    //})

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
            .state('recent', {
                url: '/recent',
                templateUrl: 'recent.html',
                controller: 'RecentCtrl'
            })

        $urlRouterProvider.otherwise('/login');
    });
