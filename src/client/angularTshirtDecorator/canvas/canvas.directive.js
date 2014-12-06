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
        var mainCanvas = element.find('#mainCanvas').get(0);
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

        rootScope.$on('stateMachine:change', function(event, stateEvent)
        {
            console.log("state machine change, to:", stateEvent.to);
            removePressEvents();
            switch(stateEvent.to)
            {
                case _editMode.MODE_PAN:
                    addPressEvents();
                    return;
            }
        });
        
        var panOffset = null;
        

        function addPressEvents()
        {
            var mouseDownPressed = false;
            element.on('mousedown', function(event)
            {
                mouseDownPressed = true;
                panOffset = {x: mainContainer.x - event.offsetX, 
                            y: mainContainer.y - event.offsetY};
                event.preventDefault();
                event.stopImmediatePropagation();
            });
            element.on('mousemove', function(event)
            {
                if(mouseDownPressed == true)
                {
                    mainContainer.x = event.offsetX + panOffset.x;
                    mainContainer.y = event.offsetY + panOffset.y;
                    ourStage.update();
                    event.preventDefault();
                    event.stopImmediatePropagation();
                }
            });
            element.on('mouseup', function(event)
            {
                mouseDownPressed = false;
                event.preventDefault();
                event.stopImmediatePropagation();
            });
        }

        function removePressEvents()
        {
            element.off('mousedown');
            element.off('pressmove');
            element.off('mouseup');
        }

        function createObject(mouseEvent)
        {
            var createdItem;
            switch(_editMode.getMode())
            {
                case _editMode.MODE_SELECT:
                    return;

                case _editMode.MODE_PAN:
                    return;

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
                    
                    // var pt = this.localToGlobal(x, y);
                    // pt = target.globalToLocal(pt.x, pt.y);
                    
                    var point = mainContainer.globalToLocal(mouseEvent.offsetX, mouseEvent.offsetY);

                    createdItem.x = point.x;
                    createdItem.y = point.y;
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


