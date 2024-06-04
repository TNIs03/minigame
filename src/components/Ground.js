var GroundLayer = cc.Layer.extend({
    grs: [],
    grWidth: 0,
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        var gr0 = new grSprite(0);
        this.grWidth = gr0._getWidth() * gr0.getScale();
        var gr1 = new grSprite(this.grWidth);
        this.grs.push(gr0, gr1);
        this.addChild(this.grs[0], 0);
        this.addChild(this.grs[1], 0);
        this.curGround = this.grs[0];
    },
    update: function() {
        this.grs[0].setPositionX(this.grs[0].getPositionX() - gameVariable.velocityX);
        this.grs[1].setPositionX(this.grs[1].getPositionX() - gameVariable.velocityX);
        if (this.grs[0].x < -this.grWidth) this.grs[0].setPositionX(this.grs[1].getPositionX() + this.grWidth);
        if (this.grs[1].x < -this.grWidth) this.grs[1].setPositionX(this.grs[0].getPositionX() + this.grWidth);
    }
})

var grSprite = cc.Sprite.extend({
    ctor:function(posX) {
        this._super();
        this.initWithFile(Game.res.ground_png);
        this.attr({
            anchorX: 0,
            anchorY: 0,
            x: posX,
            y: 0,
            scale: 2.0,
        })
    }
});