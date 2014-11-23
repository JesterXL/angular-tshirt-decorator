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
                $rootScope.$broadcast('itemsModel:add', item);
            },

            remove: function(item)
            {
                _.remove(this.items, function(anItem)
                {
                    return anItem == item;
                });
                $rootScope.$broadcast('itemsModel:remove', item);
            }
        };


        return itemsModel;
    }

})();
