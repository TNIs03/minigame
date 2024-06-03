Game.scenes[1].extend = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new Game.layers[1].extend();
        layer.init();
        this.addChild( layer );
    }
});

