(function () {
    'use strict';

    angular
        .module('app')
        .service('editMode', editMode);

    /* ngInject */
    function editMode(jxlStateMachine)
    {
        var editMode = {
            MODE_SELECT: 'select',
            MODE_PAN: 'pan',
            MODE_ZOOM_IN: 'zoomIn',
            MODE_ZOOM_OUT: 'zoomOut',
            MODE_TEXT: 'text',
            MODE_IMAGE: 'image',
            MODE_BOX: 'box',
            MODE_LINE: 'line',
            
            fsm: null,
            getMode: function()
            {
                return this.fsm.currentState.name;
            },

            setMode: function(value)
            {
                return this.fsm.changeState(value);
            }
        };

        var fsm = new jxlStateMachine();
        fsm.addState(editMode.MODE_SELECT);
        fsm.addState(editMode.MODE_PAN);
        fsm.addState(editMode.MODE_ZOOM_IN);
        fsm.addState(editMode.MODE_ZOOM_OUT);
        fsm.addState(editMode.MODE_TEXT);
        fsm.addState(editMode.MODE_IMAGE);
        fsm.addState(editMode.MODE_BOX);
        fsm.addState(editMode.MODE_LINE);
        fsm.initialState = editMode.MODE_SELECT;
        
        editMode.fsm = fsm;

        return editMode;
    }

})();
