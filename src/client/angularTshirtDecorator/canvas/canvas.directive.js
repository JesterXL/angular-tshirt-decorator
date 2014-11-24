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
        $scope.dragging = false;

        $scope.$on('itemsModel:add', function(event, item)
        {
            console.log("item:", item);
            switch(item.type)
            {
                case 'text':
                    element.append('<div data-obj="' + item.type + '" draggable="true" style="position: absolute; top: 0px; left: 0px;">' + item.data + '</div>');
                    break;

                case 'image':
                    element.append('<img data-obj="' + item.type + '" src="' + item.data + '" draggable="true" style="position: absolute; top: 0px; left: 0px;"></img>');
                    break;

                default:
                    console.warn("Unknown type:", item.type);
            }
        });

        $scope.stopDrag = function()
        {
            if($scope.dragging == true)
            {
                $scope.dragging = false;
                element.find('body').on('mousemove', null);
            }
        };

        element.on('mousedown', function(event)
        {
            console.log('mousedown');
            var draggableItem = event.target;
            if($scope.dragging == false)
            {
                console.log('starting to drag...');
                $scope.dragging = true;
                element.on('mousemove', function(e)
                {
                    // offset: where I clicked
                    // client: where parent is
                    // draggableItem.style.left = e.offsetX + 'px';
                    // draggableItem.style.top = e.offsetY + 'px';
                    // e.preventDefault();
                });
            }
        });

        element.on('mouseup', function(event)
        {
            console.log('mouseup');
            $scope.stopDrag();
        });

        element.on('mouseout', function(event)
        {
            console.log('mouseup');
            $scope.stopDrag();
        });


    }

})();


