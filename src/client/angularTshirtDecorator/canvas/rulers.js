(function() {
    'use strict';

    function Rulers(canvas)
    {
        var black = createjs.Graphics.getRGB(0,0,0);
        var topRuler = new createjs.Shape();
        var bottomRuler = new createjs.Shape();

        topRuler.graphics.setStrokeStyle(1);
        topRuler.graphics.beginStroke("#000000")
        topRuler.graphics.beginFill("#FFFFFF");
        topRuler.graphics.drawRect(0, 0, 400, 32);

        var rulers = {

        };
        return rulers;
    }



})();


