angular.module('starter', ['starter.controllers', 'starter.directives', 'starter.services'])

    .run(['$rootScope', function($rootScope, $interpolateProvider) {



    }])
    .config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
    })

    //.config(function(treeConfig) {
    //    treeConfig.defaultCollapsed = true;
    //})

    //.config(function(tagsInputConfigProvider) {
    //    tagsInputConfigProvider.setTextAutosizeThreshold(20);
    //})

    //.config(function ($httpProvider) {
    //    $httpProvider.interceptors.push('httpRequestInterceptor');
    //})

    //.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    //    $stateProvider.state('app', {
    //        url: '/app',
    //        abstract: true,
    //        cache: false,
    //        templateUrl: 'templates/menu.html',
    //        controller: 'AppCtrl'
    //    })
    //
    //        .state('app.baseDocs', {
    //            cache: false,
    //            url: '/baseDocs/baseid/:baseid',
    //            views: {
    //                'menuContent': {
    //                    templateUrl: 'templates/baseDocs.html',
    //                    controller: 'BaseDocsCtrl'
    //                },
    //                'menuLeft': {
    //                    templateUrl: 'templates/left-side-menus/directory.html',
    //                    controller: 'DirectoryListCtrl'
    //                }
    //            }
    //        })
    //    $urlRouterProvider.otherwise('/home/discover');
    //    // enable html5Mode for pushstate ('#'-less URLs)
    //    $locationProvider.html5Mode(true);
    //});
