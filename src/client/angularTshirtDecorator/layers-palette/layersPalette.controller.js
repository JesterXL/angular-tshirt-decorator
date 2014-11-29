(function () {

    angular.module('app.layersPalette')
        .controller('LayersPaletteController', LayersPaletteController);

    /* ngInject */
    function LayersPaletteController($scope, itemsModel)
    {
        var vm = this;
        vm.itemsModel = itemsModel;
        
        
    }
})();
