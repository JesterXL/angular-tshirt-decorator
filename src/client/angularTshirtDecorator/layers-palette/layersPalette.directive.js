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
            var left = parseFloat(element.css('left'));
            var top = parseFloat(element.css('top'));
            offset = {x: left - event.pageX, y: top - event.pageY};

            var moveIt = function(moveEvent)
            {
                var valueLeft = _mouse.x + offset.x + 'px';
                element.css('left', valueLeft);
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


