(function () {

    angular.module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /* ngInject */
    function ToolbarController($scope, itemsModel)
    {
        var vm = this;
        vm.onUno = function()
        {
        	itemsModel.add({type: 'text', data: 'Uno'});
        };

        vm.onDos = function()
        {
        	itemsModel.add({type: 'image', data: 'https://www.google.com/images/srpr/logo11w.png'});
        };
        
        
    }
})();
