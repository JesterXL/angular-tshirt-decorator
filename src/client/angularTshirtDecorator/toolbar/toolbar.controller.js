(function () {

    angular.module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /* ngInject */
    function ToolbarController($scope, itemsModel)
    {
        console.log("itemsModel:", itemsModel);
        var vm = this;
        vm.onUno = function()
        {
        	itemsModel.items.push("Uno");
            console.log("itemsModel:", itemsModel);
        };

        vm.onDos = function()
        {
        	itemsModel.items.push("Dos");
            console.log("itemsModel:", itemsModel);
        };
        
        
    }
})();
