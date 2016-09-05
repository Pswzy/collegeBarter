angular.module('starter.directives', [])
//card for set
.directive('showBarterList', function($state, apiServices, userServices) {
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
});