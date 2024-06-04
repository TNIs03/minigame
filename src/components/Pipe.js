var PipeLayer = cc.Layer.extend({
    pipes: [],
    pipeWidth: 0,
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        for (let i=0;i < gameDefine.pipe.pipeNumber; i++) {
            var posX = gameDefine.pipe.initPosX + gameDefine.pipe.spaceBetween * i
                + random(gameDefine.pipe.spaceRandomMin, gameDefine.pipe.spaceRandomMax);
            var posY = random(gameDefine.pipe.yMin, gameDefine.pipe.yMax);
            this.addPipe(posX, posY);
        }
        this.pipeWidth = this.pipes[0][0]._getWidth() * this.pipes[0][0].getScale();
    },
    // add a new pair of pipes to array and layer
    addPipe: function(posX, posY) {
        var gap = random(gameDefine.pipe.gapMin, gameDefine.pipe.gapMax);
        var bottomPipe = new pipeSprite(posX, posY, 0, 0, 0);
        var topPipe = new pipeSprite(posX, gap + bottomPipe._getHeight()*bottomPipe.getScale() + posY, 180, 1, 1);
        this.pipes.push([bottomPipe, topPipe]);
        this.addChild(bottomPipe, 0);
        this.addChild(topPipe, 0);
    },
    update: function() {
        for (let i=0;i < gameDefine.pipe.pipeNumber;i++) {
            this.pipes[i][0].setPositionX(this.pipes[i][0].getPositionX() - gameVariable.velocityX);
            this.pipes[i][1].setPositionX(this.pipes[i][1].getPositionX() - gameVariable.velocityX);
        }
    },
    reset: function () {
        for (let i=0;i < gameDefine.pipe.pipeNumber;i++) {
            this.removeChild(this.pipes[i][0]);
            this.removeChild(this.pipes[i][1]);
        }
        this.pipes = [];
        this.init();
    },
    // remove pair of pipes at index
    removePipe: function (index) {
        this.removeChild(this.pipes[index][0]);
        this.removeChild(this.pipes[index][1]);
        this.pipes.splice(index, 1);
    }
})

var pipeSprite = cc.Sprite.extend({
    ctor:function(posX, posY, rotation, anchorX, anchorY) {
        this._super();
        this.initWithFile(Game.res.pipe_png);
        this.attr({
            x: posX,
            y: posY,
            rotation: rotation,
            anchorX: anchorX,
            anchorY: anchorY,
            scale: 1.5,
        })
    }
});