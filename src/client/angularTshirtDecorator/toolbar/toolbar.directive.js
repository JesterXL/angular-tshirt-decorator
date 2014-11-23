(function() {
    'use strict';

    angular
        .module('app.canvas')
		.directive('jxlToolbar', jxlToolbar);

    function jxlToolbar()
    {
        return {
            restrict: 'E',
            scope: {},
            controller: 'ToolbarController',
            controllerAs: 'vm',
            templateUrl: 'toolbar/toolbar.directive.html'
        };
    }

})();


