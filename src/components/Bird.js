var Bird = cc.Sprite.extend({
    winSize: 0,
    ctor: function(winSize){
        this._super();
        this.init(winSize);
    },
    init: function(winSize) {
        this.initWithFile(Game.res.bird_png);
        this.setPositionX(gameDefine.bird.x);
        this.setPositionY(gameDefine.bird.y);
        this.winSize = winSize;
    },
    update: function() {
        // update height for bird
        this.setPositionY(this.getPositionY() + gameVariable.velocityY);
        gameVariable.velocityY -= gameDefine.move.gravity;

        // update variable if skill is used
        gameVariable.velocityX = (gameVariable.skill.dashTime === 0 ? gameDefine.bird.initVelocityX : gameDefine.bird.dashVelocityX);
        this.setScale(gameVariable.skill.powerTime === 0 ? gameDefine.bird.initScale : gameDefine.bird.powerScale);

        // if bird touch ceil
        if (this.getPositionY() > this.winSize.height) this.setPositionY(this.winSize.height);

        // change bird rotation base on vy and vx
        this.setRotation(-Math.atan(gameVariable.velocityY / gameVariable.velocityX) * 180 / Math.PI);
    },
    jump: function() {
        cc.audioEngine.playEffect(gameDefine.audio.jump_wav, false);
        gameVariable.velocityY = gameDefine.move.jumpVelocityY;
    },
    reset: function () {
        this.stopAllActions();
        this.setPositionX(gameDefine.bird.x);
        this.setPositionY(gameDefine.bird.y);
        this.setRotation(0);
        this.setScale(gameDefine.bird.initScale);
    },
    // reset skill time and cooldown if used
    dash: function () {
        gameVariable.skill.dashCD = gameDefine.skill.initDashCD;
        gameVariable.skill.dashTime = gameDefine.skill.initDashTime;
    },
    power: function () {
        gameVariable.skill.powerCD = gameDefine.skill.initPowerCD;
        gameVariable.skill.powerTime = gameDefine.skill.initPowerTime;
    },
    getRealBoundingBox: function() {
        var box = this.getBoundingBoxToWorld();
        if (gameVariable.skill.powerTime === 0) {
            box.x += gameDefine.bird.normalOffset.x;
            box.y += gameDefine.bird.normalOffset.y;
            box.width -= gameDefine.bird.normalOffset.width;
            box.height -= gameDefine.bird.normalOffset.height;
        }
        else {
            box.x += gameDefine.bird.powerOffset.x;
            box.y += gameDefine.bird.powerOffset.y;
            box.width -= gameDefine.bird.powerOffset.width;
            box.height -= gameDefine.bird.powerOffset.height;
        }
        return box;
    }
});

// sprite for shadow effect when dashing
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
        if (gameVariable.skill.dashTime !== 0) {
            this.setOpacity(this.opa);
            this.setPositionX(this._bird.x - this.offset);
            this.setPositionY(this._bird.y);
            this.setScale(this._bird.getScale());
        }
        else {
            this.setOpacity(0);
        }
    },
    reset: function () {
        this.setOpacity(0);
    }
})

var BirdLayer = cc.Layer.extend({
    bird: null,
    shadows: [],
    ctor: function (winSize) {
        this._super();
        this.init(winSize);
    },
    init: function (winSize) {
        this.bird = new Bird(winSize);
        var shadow1 = new BirdShadow(this.bird, 80, 10);
        var shadow2 = new BirdShadow(this.bird, 60, 20);
        this.shadows.push(shadow1, shadow2);
        this.addChild(this.bird, 2);
        this.addChild(shadow1, 1);
        this.addChild(shadow2, 0);
    },
    update: function () {
        this.bird.update();
        this.shadows[0].update();
        this.shadows[1].update();
    },
    reset: function () {
        this.bird.reset();
        this.shadows[0].reset();
        this.shadows[1].reset();
    }
})