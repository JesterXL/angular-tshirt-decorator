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
        var zoom = {
            get x()
            {
                return mainContainer.scaleX;
            },
            set x(value)
            {
                mainContainer.scaleX = value;
            },

            get y()
            {
                return mainContainer.scaleY;
            },
            set y(value)
            {
                mainContainer.scaleY = value;
            }
        };

        element.on('click', function(mouseEvent)
        {
            createObject(mouseEvent);
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

        function createObject(mouseEvent)
        {
            var createdItem;
            switch(_editMode.getMode())
            {
                case _editMode.MODE_SELECT:
                    return;

                case _editMode.MODE_PAN:
                    
                    break;

                case _editMode.MODE_ZOOM_IN:
                    var targetX = zoom.x * 2;
                    var targetY = zoom.y * 2;
                    TweenLite.to(zoom, 0.5, {x: targetX, y: targetY, onUpdate: function()
                    {
                        ourStage.update();
                    },
                    ease:Strong.easeOut});
                    return;

                case _editMode.MODE_ZOOM_OUT:
                    var targetX = zoom.x / 2;
                    var targetY = zoom.y / 2;
                    TweenLite.to(zoom, 0.5, {x: targetX, y: targetY, onUpdate: function()
                    {
                        ourStage.update();
                    },
                    ease:Strong.easeOut});
                    return;

                case _editMode.MODE_TEXT:
                    createdItem = new createjs.Text('Default', "20px Arial", "#ff7700");
                    createdItem.x = mouseEvent.offsetX;
                    createdItem.y = mouseEvent.offsetY;
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


