var PipeLayer = cc.Layer.extend({
    pipes: [],
    pipeWidth: 0,
    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        for (let i=0;i<10;i++) {
            var posX = Game.def.pipe.initPosX + Game.def.pipe.spaceBetween * i
                + random(Game.def.pipe.spaceRandomMin, Game.def.pipe.spaceRandomMax);
            var posY = random(Game.def.pipe.yMin, Game.def.pipe.yMax);
            this.addPipe(posX, posY);
        }
        this.pipeWidth = this.pipes[0][0]._getWidth() * this.pipes[0][0].getScale();
    },
    addPipe: function(posX, posY) {
        var gap = random(Game.def.pipe.gapMin, Game.def.pipe.gapMax);
        var bottomPipe = new pipeSprite(posX, posY, 0, 0, 0);
        var topPipe = new pipeSprite(posX, gap + bottomPipe._getHeight()*bottomPipe.getScale() + posY, 180, 1, 1);
        // var topPipe = new pipeSprite(posX, 0, 180, 1, 1);
        // var topPipe = new pipeSprite();
        console.log(bottomPipe.getPosition(), topPipe.getPosition());
        // bottomPipe.setPosition(posX, posY);
        // topPipe.setRotation(180);
        // topPipe.setPosition(posX, random(320,380) + bottomPipe._getHeight() + posY);
        // topPipe.setAnchorPoint(1,1);
        this.pipes.push([bottomPipe, topPipe]);
        this.addChild(bottomPipe, 0);
        this.addChild(topPipe, 0);
    },
    update: function() {
        for (let i=0;i<10;i++) {
            this.pipes[i][0].setPositionX(this.pipes[i][0].getPositionX() - Game.contr.velocityX);
            this.pipes[i][1].setPositionX(this.pipes[i][1].getPositionX() - Game.contr.velocityX);
        }
    },
    reset: function () {
        for (let i=0;i<10;i++) {
            this.removeChild(this.pipes[i][0]);
            this.removeChild(this.pipes[i][1]);
        }
        this.pipes = [];
        this.init();
    },
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