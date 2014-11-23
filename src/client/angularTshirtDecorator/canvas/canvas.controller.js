(function () {

    angular.module('app.canvas')
        .controller('CanvasController', CanvasController);

    /* ngInject */
    function CanvasController($scope, itemsModel)
    {
        var vm = this;
     	$scope.$watch('itemsModel', function(oldValue, newValue)
     	{
     		console.log("old:", oldValue);
     		console.log("new:", newValue);
     	}); 
        
    }
})();
