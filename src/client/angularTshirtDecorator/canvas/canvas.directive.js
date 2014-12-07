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
        
        var mainCanvas = element.find('.mainCanvas').get(0);
        var ourStage = new createjs.Stage(mainCanvas);
        var rulersCanvas = element.find('.rulersCanvas').get(0);
        var rulersStage = new createjs.Stage(rulersCanvas);

        ourStage.enableMouseOver(10);
        ourStage.mouseMoveOutside = true;

        var stageBackground = new createjs.Shape();
        stageBackground.graphics.setStrokeStyle(2);
        stageBackground.graphics.beginStroke("#000000");
        stageBackground.graphics.beginFill("#00FF00");
        stageBackground.graphics.drawRect(0, 0, 640, 480);
        ourStage.addChild(stageBackground);

        var mainContainer = new createjs.Container();
        ourStage.addChild(mainContainer);

        var rulersBackground = new createjs.Shape();
        var topRuler = new createjs.Shape();
        var bottomRuler = new createjs.Shape();

        rulersStage.addChild(rulersBackground);
        rulersStage.addChild(topRuler);
        rulersStage.addChild(bottomRuler);

        ourStage.update();

        var zoom = {

            get x()
            {
                return mainContainer.x;
            },

            set x(value)
            {
                mainContainer.x = value;
            },

            get y()
            {
                return mainContainer.x;
            },

            set y(value)
            {
                mainContainer.y = value;
            },

            get scaleX()
            {
                return mainContainer.scaleX;
            },
            set scaleX(value)
            {
                mainContainer.scaleX = value;
                redrawRulers();
            },

            get scaleY()
            {
                return mainContainer.scaleY;
            },
            set scaleY(value)
            {
                mainContainer.scaleY = value;
            }
        };

        redrawRulers();

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
                panOffset = {x: zoom.x - event.offsetX, 
                            y: zoom.y - event.offsetY};
                event.preventDefault();
                event.stopImmediatePropagation();
            });
            element.on('mousemove', function(event)
            {
                if(mouseDownPressed == true)
                {
                    zoom.x = event.offsetX + panOffset.x;
                    zoom.y = event.offsetY + panOffset.y;
                    ourStage.update();
                    redrawRulers();
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
                    var targetX = zoom.scaleX * 2;
                    var targetY = zoom.scaleY * 2;
                    TweenLite.to(zoom, 0.5, {scaleX: targetX, scaleY: targetY, onUpdate: function()
                    {
                        ourStage.update();
                    },
                    ease:Strong.easeOut});
                    return;

                case _editMode.MODE_ZOOM_OUT:
                    var targetX = zoom.scaleX / 2;
                    var targetY = zoom.scaleY / 2;
                    TweenLite.to(zoom, 0.5, {scaleX: targetX, scaleY: targetY, onUpdate: function()
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
            rulersStage.update();
        }

        function redrawRulers()
        {
            console.log("redrawRulers, zoomx: " + zoom.scaleX);

            topRuler.graphics.setStrokeStyle(2);
            topRuler.graphics.beginStroke("#000000");
            topRuler.graphics.beginFill("#FFFFFF");
            topRuler.graphics.drawRect(0, 0, 640, 32);

            var startX = zoom.x;

            topRuler.graphics.setStrokeStyle(2);
            var len = 640 / 72;
            var i;
            for(i=1; i<len; i++)
            {
                var targetDrawX = 72 * i + startX;
                var targetDrawY = 4;
                topRuler.graphics.moveTo(targetDrawX, targetDrawY);
                topRuler.graphics.lineTo(targetDrawX, targetDrawY + (32 - targetDrawY));
            }

            topRuler.graphics.setStrokeStyle(1);
            topRuler.graphics.beginStroke("#000000");
            function isOdd(num) { return num % 2;}
            len = 640 / 36;
            for(i=1; i<len; i++)
            {
                if(isOdd(i) == false)
                {
                    continue;
                }
                var targetDrawX = 36 * i + startX;
                var targetDrawY = 16;
                topRuler.graphics.moveTo(targetDrawX, targetDrawY);
                topRuler.graphics.lineTo(targetDrawX, targetDrawY + (32 - targetDrawY));
            }

            topRuler.graphics.setStrokeStyle(2);
            topRuler.graphics.beginStroke("#000000");
            len = Math.floor(640 / 12) + 1;
            for(i=0; i<len; i++)
            {
                var targetDrawX = 12 * i + startX;
                var targetDrawY = 24;
                topRuler.graphics.moveTo(targetDrawX, targetDrawY);
                topRuler.graphics.lineTo(targetDrawX, targetDrawY + (32 - targetDrawY));
            }

            rulersStage.update();
        }


    }



})();


