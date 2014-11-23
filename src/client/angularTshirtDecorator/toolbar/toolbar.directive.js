(function() {
    'use strict';

    angular
        .module('app.toolbar')
		.directive('jxlToolbar', jxlToolbar);

    function jxlToolbar()
    {
        return {
            restrict: 'E',
            scope: {},
            controller: 'ToolbarController',
            controllerAs: 'vm',
            templateUrl: 'angularTshirtDecorator/toolbar/toolbar.directive.html'
        };
    }

})();


