(function () {

    angular.module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /* ngInject */
    function ToolbarController($scope, itemsModel)
    {
        var vm = this;
        vm.onUno = function()
        {
        	itemsModel.add("Uno");
        };

        vm.onDos = function()
        {
        	itemsModel.add("Dos");
        };
        
        
    }
})();
