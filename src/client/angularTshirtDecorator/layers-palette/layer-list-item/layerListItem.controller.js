(function () {

    angular.module('app.layersPalette.layerListItem')
        .controller('LayerListItemController', LayerListItemController);

    /* ngInject */
    function LayerListItemController($scope, itemsModel)
    {
        var vm = this;
        vm.itemsModel = itemsModel;
        vm.onSelectLayer = function(event, item)
        {
        	itemsModel.setSelectedItem(item);
        };
        
    }
})();
