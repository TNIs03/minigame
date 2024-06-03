var BackgroundLayer = cc.Layer.extend({
    bgs: [],
    bgWidth: 0,
    ctor:function() {
        this._super();
        this.init();
    },
    init: function() {
        var bg0 = new bgSprite(0, Game.def.background.width, Game.def.background.height);
        this.bgWidth = bg0.bgWidth;
        var bg1 = new bgSprite(this.bgWidth, Game.def.background.width, Game.def.background.height);
        this.bgs.push(bg0, bg1);
        this.addChild(this.bgs[0], 0);
        this.addChild(this.bgs[1], 0);
    },
    update: function () {
        this.bgs[0].setPositionX(this.bgs[0].getPositionX() - Game.contr.velocityX * Game.def.background.offsetRatio);
        this.bgs[1].setPositionX(this.bgs[1].getPositionX() - Game.contr.velocityX * Game.def.background.offsetRatio);
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
//
// function init(game) {
//     var bg0 = new bgSprite();
//     var bg1 = new bgSprite();
//     var bgWidth = bg0._getWidth() * bg0.getScale();
//     bg0.setPositionX(0);
//     bg1.setPositionX(bgWidth);
//     bgs.push(bg0, bg1);
//     game.addChild(bgs[0],-1);
//     game.addChild(bgs[1],-1);
// }
//
// function update() {
//     bgs[0].setPositionX(bgs[0].getPositionX() - bird.vx);
//     bgs[1].setPositionX(bgs[1].getPositionX() - bird.vx);
//     if (bgs[0].x < -bgWidth) bgs[0].setPositionX(bgs[1].getPositionX() + bgWidth);
//     if (bgs[1].x < -bgWidth) bgs[1].setPositionX(bgs[0].getPositionX() + bgWidth);
// }


