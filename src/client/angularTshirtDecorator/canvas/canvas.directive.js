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
         //Create a stage by getting a reference to the canvas
        // var ourStage = new createjs.Stage("mainCanvas");
        // //Create a Shape DisplayObject.
        // var circle = new createjs.Shape();
        // circle.graphics.beginFill("red").drawCircle(0, 0, 40);
        // //Set position of Shape instance.
        // circle.x = circle.y = 50;
        // //Add Shape instance to stage display list.
        // ourStage.addChild(circle);
        // //Update stage will render next frame
        // ourStage.update();


        // $scope.dragging = false;
        $scope.ids = 0;

        $scope.$on('itemsModel:add', function(event, item)
        {
            console.log("item:", item);
            $scope.ids++;
            var createdItem;
            switch(item.type)
            {
                case 'text':
                    createdItem = document.createElement('<div data-obj="' + item.type + '" data-id="' + $scope.ids + '" style="position: absolute; top: 0px; left: 0px;">' + item.data + '</div>');
                    break;

                case 'image':
                    createdItem = document.createElement('img');
                    // <img data-obj="' + item.type + '" data-id="' + $scope.ids + '" src="' + item.data + '" draggable="false" style="position: absolute; top: 0px; left: 0px;"></img>'
                    createdItem.src = item.data;
                    break;

                default:
                    console.warn("Unknown type:", item.type);
            }
            $(createdItem).draggable();
            element.append(createdItem);
        });


        // $scope.stopDrag = function()
        // {
        //     if($scope.dragging == true)
        //     {
        //         $scope.dragging = false;
        //         element.on('mousemove', null);
        //     }
        // };

        // element.on('mousedown', function(event)
        // {
        //     console.log('mousedown');
        //     var draggableItem = event.target;
        //     if($scope.dragging == false)
        //     {
        //         console.log('starting to drag...');
        //         $scope.dragging = true;
        //         element.on('mousemove', function(e)
        //         {
        //             console.log("moving...");
        //             // offset: where I clicked
        //             // client: where parent is
        //             draggableItem.style.left = e.offsetX + 'px';
        //             // draggableItem.style.top = e.offsetY + 'px';
        //             event.preventDefault();
        //             e.preventDefault();
        //             event.stopImmediatePropagation();
        //             e.stopImmediatePropagation();
        //         });
        //     }
        // });

        // element.on('mouseup', function(event)
        // {
        //     console.log('mouseup');
        //     $scope.stopDrag();
        // });

        // element.on('mouseout', function(event)
        // {
        //     console.log('mouseup');
        //     $scope.stopDrag();
        // });


    }

})();


