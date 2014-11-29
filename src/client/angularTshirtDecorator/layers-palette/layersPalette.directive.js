(function() {
    'use strict';

    angular
        .module('app.layersPalette')
		.directive('jxlLayersPalette', jxlLayersPalette);

    var _window;
    var _mouse;

    function jxlLayersPalette($window, mouse)
    {
        _window = $window;
        _mouse = mouse;
        return {
            restrict: 'E',
            scope: {},
            controller: 'LayersPaletteController',
            controllerAs: 'vm',
            templateUrl: 'angularTshirtDecorator/layers-palette/layersPalette.directive.html',
            link: link
        };
    }

    function link(scope, element, attrs)
    {
        var dragging = false;
        var offset = null;
        var lastID = null;

        element.on('mousedown', function(event)
        {
            if(dragging == true)
            {
                return;
            }
            console.log("************");

            var left = parseFloat(element.css('left'));
            var top = parseFloat(element.css('top'));
            console.log("left: " + left + ", top: " + top);
            offset = {x: left - event.pageX, y: top - event.pageY};

            var moveIt = function(moveEvent)
            {
                console.log("-------------");
                console.log("before:", element.css('left'));
                var valueLeft = _mouse.x + offset.x + 'px';
                console.log("_mouse.x:", _mouse.x);
                console.log("offset.x:", offset.x);
                console.log("setting to valueLeft:", valueLeft);
                element.css('left', valueLeft);
                console.log("after:", element.css('left'));
                element.css('top', _mouse.y + offset.y + 'px');
                lastID = _window.requestAnimationFrame(moveIt);
            };

            lastID = _window.requestAnimationFrame(moveIt);
            
            event.stopImmediatePropagation();
            event.preventDefault();
        });

        element.on('mouseup', function()
        {
            dragging = false;
            _window.cancelAnimationFrame(lastID);
            lastID = null;
        });
    }

})();


