(function () {
    'use strict';

    angular
        .module('app')
        .service('mouse', mouse);

    /* ngInject */
    function mouse()
    {
        var mouse = {
            _x: 0,
            _y: 0,

            get x()
            {
                return this._x;
            },

            get y()
            {
                return this._y;
            }
        };

        document.onmousemove = function(event)
        {
            var dot, eventDoc, doc, body, pageX, pageY;

            event = event || window.event; // IE-ism

            // If pageX/Y aren't available and clientX/Y are,
            // calculate pageX/Y - logic taken from jQuery.
            // (This is to support old IE)
            if (event.pageX == null && event.clientX != null) {
                eventDoc = (event.target && event.target.ownerDocument) || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;

                event.pageX = event.clientX +
                  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                  (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY +
                  (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                  (doc && doc.clientTop  || body && body.clientTop  || 0 );
            }

            // Use event.pageX / event.pageY here
            mouse._x = event.pageX;
            mouse._y = event.pageY;
        };


        return mouse;
    }

})();
