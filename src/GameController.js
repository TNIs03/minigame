var GameController = cc.Class.extend({
    _labelLayer: null,
    _bird: null,
    _pipeLayer: null,
    _groundLayer: null,
    ctor: function(_labelLayer, _bird, _pipeLayer, _groundLayer) {
        // this._super();
        this._labelLayer = _labelLayer;
        this._bird = _bird;
        this._pipeLayer = _pipeLayer;
        this._groundLayer = _groundLayer;
    },
    onEnterPressed: function() {
        if (Game.contr.gameState === Game.def.gameState.Waiting) {
            this._labelLayer.removeChildByTag("startLabel");
            this.enterCounting();
        }
        else if (Game.contr.gameState === Game.def.gameState.Ended) {
            this._labelLayer.endLabel.setVisible(false);
            this.resetState();
            this.enterCounting();
        }
    },
    enterCounting: function() {
        var _labelLayer = this._labelLayer;
        Game.contr.gameState = Game.def.gameState.Counting;
        _labelLayer.counting();

        setTimeout(function (){
            Game.contr.gameState = Game.def.gameState.Playing;
            _labelLayer.scoreLabel.setVisible(true);
            },Game.def.countdownTime * 1000);
    },
    update: function (dt) {
        if (Game.contr.gameState === Game.def.gameState.Playing) {
            this.checkCollision();
            if (Game.contr.gameOver) return;
            this.checkScore();
            this.checkPipe();
            this.updateSkill(dt);
        }
    },
    checkCollision: function () {
        var _pipes = this._pipeLayer.pipes;
        var birdBoundingBox = this._bird.getRealBoundingBox();
        if(cc.rectIntersectsRect(birdBoundingBox, _pipes[Game.contr.curPipe][0].getBoundingBoxToWorld()) ||
            cc.rectIntersectsRect(birdBoundingBox, _pipes[Game.contr.curPipe][1].getBoundingBoxToWorld())) {
            if (Game.contr.skill.powerTime !== 0) {
                var posX = _pipes[9][0].getPositionX() + Game.def.pipe.spaceBetween
                    + random(Game.def.pipe.spaceRandomMin, Game.def.pipe.spaceRandomMax);
                var posY = random(Game.def.pipe.yMin, Game.def.pipe.yMax);
                this._pipeLayer.removePipe(Game.contr.curPipe);
                this._pipeLayer.addPipe(posX, posY);

                Game.contr.score++;
                this._labelLayer.scoreLabel.setString(Game.contr.score.toString());
            }
            else Game.contr.gameOver = true;
        }
        if (cc.rectIntersectsRect(birdBoundingBox,this._groundLayer.grs[0].getBoundingBoxToWorld())
            || cc.rectIntersectsRect(birdBoundingBox,this._groundLayer.grs[1].getBoundingBoxToWorld()))
            Game.contr.gameOver = true;
    },
    checkScore: function() {
        if (this._pipeLayer.pipes[Game.contr.curPipe][0].getPositionX() + this._pipeLayer.pipeWidth < this._bird.getPositionX()) {
            cc.audioEngine.playEffect(Game.def.audio.score_wav, false);
            Game.contr.score++;
            this._labelLayer.scoreLabel.setString(Game.contr.score.toString());
            Game.contr.curPipe++;
        }
    },
    checkPipe: function () {
        var _pipeLayer = this._pipeLayer;
        if (_pipeLayer.pipes[0][0].getPositionX() < -_pipeLayer.pipeWidth) {
            var posX = _pipeLayer.pipes[9][0].getPositionX() + Game.def.pipe.spaceBetween
                + random(Game.def.pipe.spaceRandomMin, Game.def.pipe.spaceRandomMax);
            var posY = random(Game.def.pipe.yMin, Game.def.pipe.yMax);
            this._pipeLayer.removePipe(0);
            Game.contr.curPipe--;
            _pipeLayer.addPipe(posX, posY);
        }
    },
    resetState: function () {
        Game.contr.velocityY = 0;
        Game.contr.velocityX = Game.def.bird.initVelocityX;
        Game.contr.score = 0;
        Game.contr.gameOver = false;
        this._pipeLayer.reset();
        this._bird.reset();
        this._labelLayer.scoreLabel.setString("0");
        this._labelLayer.scoreLabel.setVisible(false);
        this._labelLayer.dashLabel.setVisible(false);
        this._labelLayer.powerLabel.setVisible(false);

        Game.contr.skill.dashCD = Game.def.skill.initDashCD;
        Game.contr.skill.dashTime = 0;
        Game.contr.skill.powerCD = Game.def.skill.initPowerCD;
        Game.contr.skill.powerTime = 0;
    },
    updateSkill: function (dt) {
        Game.contr.skill.dashCD = Math.max(0, Game.contr.skill.dashCD - dt);
        Game.contr.skill.dashTime = Math.max(0, Game.contr.skill.dashTime - dt);
        this._labelLayer.dashLabel.setVisible(Game.contr.skill.dashCD === 0);

        if (Game.contr.skill.powerTime === 0) Game.contr.skill.powerCD = Math.max(0, Game.contr.skill.powerCD - dt);
        Game.contr.skill.powerTime = Math.max(0, Game.contr.skill.powerTime - dt);
        this._labelLayer.powerLabel.setVisible(Game.contr.skill.powerCD === 0);
    },
    pauseHandle: function () {
        if (Game.contr.gameState === Game.def.gameState.Playing) {
            Game.contr.gameState = Game.def.gameState.Pausing;
            cc.audioEngine.pauseMusic();
            this._labelLayer.pauseLabel.setVisible(true);
        }
        else if (Game.contr.gameState === Game.def.gameState.Pausing) {
            Game.contr.gameState = Game.def.gameState.Playing;
            cc.audioEngine.resumeMusic();
            this._labelLayer.pauseLabel.setVisible(false);
        }
    }
})