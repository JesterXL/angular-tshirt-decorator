(function() {
    'use strict';

    angular
        .module('app.canvas')
		.directive('jxlCanvas', jxlCanvas);

    function jxlCanvas()
    {
        return {
            restrict: 'E',
            scope: {},
            controller: 'CanvasController',
            controllerAs: 'vm',
            templateUrl: 'angularTshirtDecorator/canvas/canvas.directive.html',
            link: link
        };
    }

    function link()
    {
        
    }

})();


