angular.module('starter.directives', [])
.directive('showBarterList', function() {
    return {
        scope: {
            val: '='
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: '../../templates/show-barter-list.html',
        link: function(scope, el, attrs) {

        }
    };
})

.directive('headNav', function() {
    return {
        scope: {
            val: '='
        },
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'dirtemplate/head-nav.html',
        //template:"<div>hello angular</div>",
        link: function(scope, el, attrs) {

        }
    };
});