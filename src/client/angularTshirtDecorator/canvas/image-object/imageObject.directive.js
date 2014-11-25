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
                cow: '@',
                test: '@'
            },
            templateUrl: 'angularTshirtDecorator/canvas/image-object/imageObject.directive.html',
            link: link
            
        };
    }

    function link(scope, element, attrs, ImageObjectController)
    {
        console.log("imageObject::link");
        console.log("scope.cow:", scope.cow);
        scope.test = 'mytest';

    }


})();


