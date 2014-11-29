(function() {
    'use strict';

    angular
        .module('app.canvas')
		.directive('jxlCanvas', jxlCanvas);

    var compile;
    var rootScope;
    var _itemsModel;

    function jxlCanvas(itemsModel, $compile, $rootScope)
    {
        _itemsModel = itemsModel;
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

        // function tick(event)
        // {
        //     ourStage.update(event);
        // }
        // createjs.Ticker.addEventListener("tick", tick);


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
                        $scope.$apply(function()
                        {
                            createdItem.offset = {x:createdItem.x-event.stageX, y:createdItem.y-event.stageY};
                            // createdItem.parent.setChildIndex(createdItem, createdItem.parent.getNumChildren() - 1);
                            // ourStage.update();
                            // _itemsModel.setToTop(createdItem.data);
                            _itemsModel.setSelectedItem(createdItem.data);
                        });
                        

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
                    return;
            }
            createdItem.data = item;
            ourStage.addChild(createdItem);
            ourStage.update();
        });

    }

})();


