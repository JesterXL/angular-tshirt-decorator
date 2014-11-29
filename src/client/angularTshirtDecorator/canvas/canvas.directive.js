(function() {
    'use strict';

    angular
        .module('app.canvas')
		.directive('jxlCanvas', jxlCanvas);

    var compile;
    var rootScope;

    function jxlCanvas(itemsModel, $compile, $rootScope)
    {
        compile = $compile;
        rootScope = $rootScope;
        return {
            restrict: 'E',
            scope: {},
            controller: 'CanvasController',
            controllerAs: 'vm',
            templateUrl: 'angularTshirtDecorator/canvas/canvas.directive.html',
            link: link
        };
    }

    function link($scope, element, attrs, CanvasController)
    {
        var ourStage = new createjs.Stage("mainCanvas");
        ourStage.enableMouseOver(10);
        ourStage.mouseMoveOutside = true;

        function tick(event)
        {
            //ourStage.update(event);
        }
        createjs.Ticker.addEventListener("tick", tick);


        $scope.$on('itemsModel:add', function(event, item)
        {
            var createdItem;
            switch(item.type)
            {
                case 'text':
                    createdItem = new createjs.Text(item.data, "20px Arial", "#ff7700");
                    createdItem.x = 100;
                    createdItem.y = 100;
                    createdItem.textBaseline = "alphabetic";
                    break;

                case 'image':
                    createdItem = new createjs.Bitmap(item.data);
                    createdItem.cursor = "pointer";
                    createdItem.image.onload = function()
                    {
                        ourStage.update();
                    };
                    createdItem.addEventListener("mousedown", function(event)
                    {
                        createdItem.offset = {x:createdItem.x-event.stageX, y:createdItem.y-event.stageY};
                        createdItem.parent.setChildIndex(createdItem, createdItem.parent.getNumChildren() - 1);
                        ourStage.update();
                    });
                    createdItem.addEventListener("pressmove", function(event)
                    {
                        createdItem.x = event.stageX + createdItem.offset.x;
                        createdItem.y = event.stageY + createdItem.offset.y;
                        ourStage.update();
                    });
                    break;

                default:
                    console.warn("Unknown type:", item.type);
            }
            ourStage.addChild(createdItem);
            ourStage.update();
        });




        // $scope.dragging = false;
        // $scope.ids = 0;

        // $scope.$on('itemsModel:add', function(event, item)
        // {
        //     console.log("item:", item);
        //     $scope.ids++;
        //     var createdItem;
        //     switch(item.type)
        //     {
        //         case 'text':
        //             createdItem = document.createElement('<div data-obj="' + item.type + '" data-id="' + $scope.ids + '" style="position: absolute; top: 0px; left: 0px;">' + item.data + '</div>');
        //             break;

        //         case 'image':
        //             createdItem = compile('<jxl-image-object src="' + item.data + '"></jxl-image-object>')($scope)[0];
        //             break;

        //         default:
        //             console.warn("Unknown type:", item.type);
        //     }
        //     $(createdItem).draggable();
        //     element.append(createdItem);
        // });


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


