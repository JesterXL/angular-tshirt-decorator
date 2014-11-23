(function() {
    'use strict';

    angular
        .module('app.canvas')
		.directive('jxlCanvas', jxlCanvas);

    function jxlCanvas(itemsModel)
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

    function link($scope, element, attrs, CanvasController, $rootScope)
    {
        $scope.$on('itemsModel:add', function(event, item)
        {
            console.log("item:", item);
            switch(item.type)
            {
                case 'text':
                    element.append('<span>' + item.data + '</span>');
                    break;

                default:
                    console.warn("Unknown type:", item.type);
            }
        });
    }

})();


