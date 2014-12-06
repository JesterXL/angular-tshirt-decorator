(function() {
    'use strict';

    angular
        .module('app.canvas')
		.directive('jxlCanvas', jxlCanvas);

    var compile;
    var rootScope;
    var _itemsModel;
    var _editMode;

    function jxlCanvas(itemsModel, $compile, $rootScope, editMode)
    {
        _itemsModel = itemsModel;
        compile = $compile;
        rootScope = $rootScope;
        _editMode = editMode;

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
        var mainContainer = new createjs.Container();
        ourStage.addChild(mainContainer);

        element.on('click', function(mouseEvent)
        {
            createObject();
        });

        // function tick(event)
        // {
        //     ourStage.update(event);
        // }
        // createjs.Ticker.addEventListener("tick", tick);

        // MODE_SELECT: 'select',
        // MODE_PAN: 'pan',
        // MODE_ZOOM: 'zoom',
        // MODE_TEXT: 'text',
        // MODE_IMAGE: 'image',
        // MODE_BOX: 'box',
        // MODE_LINE: 'line',

        function createObject()
        {
            var createdItem;
            switch(_editMode.getMode())
            {
                case _editMode.MODE_SELECT:
                    return;

                case _editMode.MODE_PAN:
                    
                    break;

                case _editMode.MODE_ZOOM:
                    // mainContainer.scaleX = mainContainer.scaleY = 2;
                    // ourStage.update();
                    TweenLite.to(mainContainer, 2, {scaleX: 2, scaleY: 2, onUpdate: function()
                    {
                        ourStage.update();
                    }});
                    return;

                case _editMode.MODE_TEXT:
                    createdItem = new createjs.Text('Default', "20px Arial", "#ff7700");
                    createdItem.x = 100;
                    createdItem.y = 100;
                    createdItem.textBaseline = "alphabetic";
                    break;

                case _editMode.MODE_IMAGE:
                    createdItem = new createjs.Bitmap(item.data);
                    createdItem.cursor = "pointer";
                    createdItem.image.onload = function()
                    {
                        ourStage.update();
                    };
                    break;

                case _editMode.MODE_BOX:

                    break;

                case _editMode.MODE_LINE:

                    break;

                default:
                    console.warn("Unknown type:", item.type);
                    return;
            }

            // createdItem.data = item;
            createdItem.addEventListener("mousedown", function(event)
            {
                $scope.$apply(function()
                {
                    createdItem.offset = {x:createdItem.x-event.stageX, y:createdItem.y-event.stageY};
                    _itemsModel.setSelectedItem(createdItem.data);
                });
            });
            createdItem.addEventListener("pressmove", function(event)
            {
                createdItem.x = event.stageX + createdItem.offset.x;
                createdItem.y = event.stageY + createdItem.offset.y;
                ourStage.update();
            });

            mainContainer.addChild(createdItem);
            ourStage.update();
        }
    }



})();


