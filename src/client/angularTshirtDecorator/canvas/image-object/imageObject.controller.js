(function () {

    angular.module('app.canvas.image')
        .controller('ImageObjectController', ImageObjectController);

    /* ngInject */
    function ImageObjectController($scope)
    {
    	console.log("ImageObjectController::constructor, $scope:", $scope);
        var vm = this;
        
    }
})();
