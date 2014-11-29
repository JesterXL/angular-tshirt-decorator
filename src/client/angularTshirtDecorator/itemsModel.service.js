(function () {
    'use strict';

    angular
        .module('app')
        .service('itemsModel', itemsModel);

    /* ngInject */
    function itemsModel($rootScope)
    {
        var IDs = 0;

        function getLayerName()
        {
            return "Layer " + (++IDs);
        }

        function setLayerName(item)
        {
            if(typeof item.label == 'undefined')
            {
                item.label = getLayerName();
            }
        }

        var itemsModel = {
            items: [],

            add: function(item)
            {
                setLayerName(item);
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
