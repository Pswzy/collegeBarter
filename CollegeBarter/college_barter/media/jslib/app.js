/**
* @file: controller配置文件
* @author: Pengcheng Song (spc@data.me), Yifeng Li
*/

angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'starter.configs', 'ngTagsInput', 'ngCookies', 'ngSanitize', 'ui.tree'])

.run(['$rootScope', '$ionicPlatform', function($rootScope, $interpolateProvider) {

    //Set global parameters
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');
        //set meta title

}])

.config(function(treeConfig) {
    treeConfig.defaultCollapsed = true;
})

.config(function(tagsInputConfigProvider) {
  tagsInputConfigProvider.setTextAutosizeThreshold(20);
})

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.tabs.position("bottom"); //Places them at the bottom for all OS
    $ionicConfigProvider.tabs.style("standard"); //Makes them all look the same across all OS
    $ionicConfigProvider.navBar.alignTitle('center');
    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        cache: false,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.baseDocs', {
        cache: false,
        url: '/baseDocs/baseid/:baseid',
        views: {
            'menuContent': {
                templateUrl: 'templates/baseDocs.html',
                controller: 'BaseDocsCtrl'
            },
            'menuLeft': {
                templateUrl: 'templates/left-side-menus/directory.html',
                controller: 'DirectoryListCtrl'
            }
        }
    })
    $urlRouterProvider.otherwise('/home/discover');
    // enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode(true);
});
