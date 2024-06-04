var BackgroundLayer = cc.Layer.extend({
    bgs: [],
    bgWidth: 0,
    ctor:function() {
        this._super();
        this.init();
    },
    init: function() {
        var bg0 = new bgSprite(0, gameDefine.background.width, gameDefine.background.height);
        this.bgWidth = bg0.bgWidth;
        var bg1 = new bgSprite(this.bgWidth, gameDefine.background.width, gameDefine.background.height);
        this.bgs.push(bg0, bg1);
        this.addChild(this.bgs[0], 0);
        this.addChild(this.bgs[1], 0);
    },
    update: function () {
        this.bgs[0].setPositionX(this.bgs[0].getPositionX() - gameVariable.velocityX * gameDefine.background.offsetRatio);
        this.bgs[1].setPositionX(this.bgs[1].getPositionX() - gameVariable.velocityX * gameDefine.background.offsetRatio);
        if (this.bgs[0].x < -this.bgWidth) this.bgs[0].setPositionX(this.bgs[1].getPositionX() + this.bgWidth);
        if (this.bgs[1].x < -this.bgWidth) this.bgs[1].setPositionX(this.bgs[0].getPositionX() + this.bgWidth);
    }
})

var bgSprite = cc.Sprite.extend({
    bgWidth: 0,
    ctor:function(posX, width, height) {
        this._super();
        this.initWithFile(Game.res.background_png, cc.rect(0,0,width, height));
        this.attr({
            anchorX: 0,
            anchorY: 0,
            x: posX,
            y:0,
            scale: 2.0,
        })
        this.bgWidth = this._getWidth() * this.getScale();
    }
});


