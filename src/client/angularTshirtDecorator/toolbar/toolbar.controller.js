(function () {

    angular.module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /* ngInject */
    function ToolbarController($scope, itemsModel, editMode)
    {
        console.log("editMode:", editMode);
        var vm = this;
        vm.editMode = editMode;
        vm.onSelect = function()
        {
            vm.editMode.setMode(vm.editMode.MODE_SELECT);
        };

        vm.onText = function()
        {
            vm.editMode.setMode(vm.editMode.MODE_TEXT)
            .then(function()
            {
                console.log(".... and text.");
            });
        };

        vm.onImage = function()
        {
            vm.editMode.setMode(vm.editMode.MODE_IMAGE);
        };
        
        vm.onZoomIn = function()
        {
            vm.editMode.setMode(vm.editMode.MODE_ZOOM_IN);
        };

        vm.onZoomOut = function()
        {
            vm.editMode.setMode(vm.editMode.MODE_ZOOM_OUT);
        };

        vm.onPan = function()
        {
            vm.editMode.setMode(vm.editMode.MODE_PAN);
        };
        
    }
})();
