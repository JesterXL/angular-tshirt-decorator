(function() {
    'use strict';

    angular
        .module('app.layersPalette.layerListItem')
		.directive('jxlLayerListItem', jxlLayerListItem);

    function jxlLayerListItem()
    {
        return {
            restrict: 'E',
            scope: {
                item: '='
            },
            controller: 'LayerListItemController',
            controllerAs: 'vm',
            templateUrl: 'angularTshirtDecorator/layers-palette/layer-list-item/layerListItem.directive.html',
            link: link
        };
    }

    function link(scope, element, attrs)
    {
       
    }

})();


