(function () {
    'use strict';

    angular
        .module('app')
        .service('itemsModel', itemsModel);

    /* ngInject */
    function itemsModel($rootScope)
    {
        var itemsModel = {
            items: []
        };
        return itemsModel;
    }

})();
