(function() {
    'use strict';

    angular
        .module('app.canvas.image')
		.directive('jxlImageObject', jxlImageObject);

    var compile;
    function jxlImageObject($compile)
    {
        compile = $compile;
        return {
            restrict: 'E',
            scope: {
                src: '@'
            },
            templateUrl: 'angularTshirtDecorator/canvas/image-object/imageObject.directive.html',
            
        };
    }


})();


