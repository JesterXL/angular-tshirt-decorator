(function () {
    'use strict';

    angular
        .module('app')
        .service('itemsModel', itemsModel);

    /* ngInject */
    function itemsModel($rootScope)
    {
        var itemsModel = {
            items: [],

            add: function(item)
            {
                this.items.push(item);
                $rootScope.$broadcast('test');
            }
        };


        return itemsModel;
    }

})();
