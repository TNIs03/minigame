var Bird = cc.Sprite.extend({
    winSize: 0,
    ctor: function(winSize){
        this._super();
        this.init(winSize);
    },
    init: function(winSize) {
        this.initWithFile(Game.res.bird_png);
        this.setPositionX(Game.def.bird.x);
        this.setPositionY(Game.def.bird.y);
        this.winSize = winSize;
    },
    update: function(dt) {
        this.setPositionY(this.getPositionY() + Game.contr.velocityY);
        Game.contr.velocityY -= Game.def.move.gravity;
        Game.contr.velocityX = (Game.contr.skill.dashTime === 0 ? Game.def.bird.initVelocityX : Game.def.bird.dashVelocityX);
        this.setScale(Game.contr.skill.powerTime === 0 ? Game.def.bird.initScale : Game.def.bird.powerScale);
        if (this.getPositionY() > this.winSize.height) this.setPositionY(this.winSize.height);
        this.setRotation(-Math.atan(Game.contr.velocityY / Game.contr.velocityX) * 180 / Math.PI);
    },
    jump: function() {
        cc.audioEngine.playEffect(Game.def.audio.jump_wav, false);
        Game.contr.velocityY = Game.def.move.jumpVelocityY;
    },
    reset: function () {
        this.setPositionX(Game.def.bird.x);
        this.setPositionY(Game.def.bird.y);
        this.setRotation(0);
        this.setScale(Game.def.bird.initScale);
    },
    dash: function () {
        Game.contr.skill.dashCD = Game.def.skill.initDashCD;
        Game.contr.skill.dashTime = Game.def.skill.initDashTime;
    },
    power: function () {
        Game.contr.skill.powerCD = Game.def.skill.initPowerCD;
        Game.contr.skill.powerTime = Game.def.skill.initPowerTime;
    },
    getRealBoundingBox: function() {
        var box = this.getBoundingBoxToWorld();
        if (Game.contr.skill.powerTime === 0) {
            box.x += Game.def.bird.normalOffset.x;
            box.y += Game.def.bird.normalOffset.y;
            box.width -= Game.def.bird.normalOffset.width;
            box.height -= Game.def.bird.normalOffset.height;
        }
        else {
            box.x += Game.def.bird.powerOffset.x;
            box.y += Game.def.bird.powerOffset.y;
            box.width -= Game.def.bird.powerOffset.width;
            box.height -= Game.def.bird.powerOffset.height;
        }
        return box;
    }
});

var BirdShadow = cc.Sprite.extend({
    _bird: null,
    opa: 0,
    offset: 0,
    ctor: function(_bird, opa, offset){
        this._super();
        this.init(_bird, opa, offset);
    },
    init: function(_bird, opa, offset) {
        this.initWithFile(Game.res.bird_png);
        this._bird = _bird;
        this.opa = opa;
        this.offset = offset;
    },
    update: function() {
        if (Game.contr.skill.dashTime !== 0) {
            this.setOpacity(this.opa);
            this.setPositionX(this._bird.x - this.offset);
            this.setPositionY(this._bird.y);
        }
        else {
            this.setOpacity(0);
        }
    },
})