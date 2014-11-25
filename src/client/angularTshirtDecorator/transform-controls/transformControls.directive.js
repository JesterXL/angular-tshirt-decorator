(function() {
    'use strict';

    angular
        .module('app.transformControls')
		.directive('jxlTransformControls', jxlTransformControls);

    function jxlTransformControls()
    {
        return {
            restrict: 'E',
            scope: {},
            controller: 'TransformControlsController',
            controllerAs: 'vm',
            templateUrl: 'angularTshirtDecorator/transform-controls/transformControls.directive.html'
        };
    }

})();


