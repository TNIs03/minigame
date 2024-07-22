var GameController = cc.Class.extend({
    _labelLayer: null,
    _birdLayer: null,
    _pipeLayer: null,
    _groundLayer: null,
    ctor: function(_labelLayer, _birdLayer, _pipeLayer, _groundLayer) {
        // this._super();
        this._labelLayer = _labelLayer;
        this._birdLayer = _birdLayer;
        this._pipeLayer = _pipeLayer;
        this._groundLayer = _groundLayer;
    },
    // handle event on Enter pressed
    onEnterPressed: function() {
        if (gameVariable.gameState === gameDefine.gameState.Waiting) {
            this._labelLayer.removeChildByTag("startLabel");
            cc.audioEngine.resumeMusic();
            this.enterCounting();
        }
        else if (gameVariable.gameState === gameDefine.gameState.Ended) {
            this._labelLayer.endLabel.setVisible(false);
            this.resetState();
            this.enterCounting();
        }
    },
    // called when game enter counting state
    enterCounting: function() {
        var _labelLayer = this._labelLayer;
        gameVariable.gameState = gameDefine.gameState.Counting;
        _labelLayer.counting();

        setTimeout(function (){
            gameVariable.gameState = gameDefine.gameState.Playing;
            _labelLayer.scoreLabel.setVisible(true);
            },gameDefine.countdownTime * 1000);
    },
    update: function (dt) {
        if (gameVariable.gameState === gameDefine.gameState.Playing) {
            this.checkCollision();
            if (gameVariable.gameOver) return;
            this.checkScore();
            this.checkPipe();
            this.updateSkill(dt);
        }
    },
    checkCollision: function () {
        var _pipes = this._pipeLayer.pipes;
        var birdBoundingBox = this._birdLayer.bird.getRealBoundingBox();

        // check ground collision
        if (cc.rectIntersectsRect(birdBoundingBox,this._groundLayer.grs[0].getBoundingBoxToWorld())
            || cc.rectIntersectsRect(birdBoundingBox,this._groundLayer.grs[1].getBoundingBoxToWorld())) {
            gameVariable.gameOver = true;
            return;
        }

        // check pipe collision
        if (gameVariable.skill.powerTime === 0) {
            // when power not active
            if(cc.rectIntersectsRect(birdBoundingBox, _pipes[gameVariable.curPipe][0].getBoundingBoxToWorld()) ||
                cc.rectIntersectsRect(birdBoundingBox, _pipes[gameVariable.curPipe][1].getBoundingBoxToWorld())) {
                gameVariable.gameOver = true;
            }
        }
        else {
            // when power is active
            var collidePipeIndex = -1;
            if (cc.rectIntersectsRect(birdBoundingBox, _pipes[gameVariable.curPipe][0].getBoundingBoxToWorld()))
                collidePipeIndex = 0;
            else if (cc.rectIntersectsRect(birdBoundingBox, _pipes[gameVariable.curPipe][1].getBoundingBoxToWorld()))
                collidePipeIndex = 1;
            if (collidePipeIndex === -1) return;

            // run animation when collide with pipe
            var currentPipe = _pipes[gameVariable.curPipe][collidePipeIndex];
            var targetY = (collidePipeIndex === 1 ? this._birdLayer.bird.winSize.height :
                -currentPipe._getHeight() * currentPipe.getScale());
            var action = cc.moveTo(gameDefine.pipe.moveTime, cc.p(currentPipe.x, targetY));
            currentPipe.runAction(action);
        }

    },
    // check and update score
    checkScore: function() {
        if (this._pipeLayer.pipes[gameVariable.curPipe][0].getPositionX() + this._pipeLayer.pipeWidth < this._birdLayer.bird.getPositionX()) {
            cc.audioEngine.playEffect(gameDefine.audio.score_wav, false);
            gameVariable.score++;
            this._labelLayer.scoreLabel.setString(gameVariable.score.toString());
            gameVariable.curPipe++;
        }
    },
    // check if first pipe passed game window
    checkPipe: function () {
        var _pipeLayer = this._pipeLayer;
        if (_pipeLayer.pipes[0][0].getPositionX() < -_pipeLayer.pipeWidth) {
            var posX = _pipeLayer.pipes[gameDefine.pipe.pipeNumber - 1][0].getPositionX() + gameDefine.pipe.spaceBetween
                + random(gameDefine.pipe.spaceRandomMin, gameDefine.pipe.spaceRandomMax);
            var posY = random(gameDefine.pipe.yMin, gameDefine.pipe.yMax);
            this._pipeLayer.removePipe(0);
            gameVariable.curPipe--;
            _pipeLayer.addPipe(posX, posY);
        }
    },
    // reset all game state for game restart
    resetState: function () {
        gameVariable.velocityY = 0;
        gameVariable.velocityX = gameDefine.bird.initVelocityX;
        gameVariable.curPipe = 0;
        gameVariable.score = 0;
        gameVariable.gameOver = false;
        this._pipeLayer.reset();
        this._birdLayer.reset();
        this._labelLayer.scoreLabel.setString("0");
        this._labelLayer.scoreLabel.setVisible(false);
        this._labelLayer.dashLabel.setVisible(false);
        this._labelLayer.powerLabel.setVisible(false);

        gameVariable.skill.dashCD = gameDefine.skill.initDashCD;
        gameVariable.skill.dashTime = 0;
        gameVariable.skill.powerCD = gameDefine.skill.initPowerCD;
        gameVariable.skill.powerTime = 0;
    },
    // update skill time and cooldown
    updateSkill: function (dt) {
        gameVariable.skill.dashCD = Math.max(0, gameVariable.skill.dashCD - dt);
        gameVariable.skill.dashTime = Math.max(0, gameVariable.skill.dashTime - dt);
        this._labelLayer.dashLabel.setVisible(gameVariable.skill.dashCD === 0);

        if (gameVariable.skill.powerTime === 0) gameVariable.skill.powerCD = Math.max(0, gameVariable.skill.powerCD - dt);
        gameVariable.skill.powerTime = Math.max(0, gameVariable.skill.powerTime - dt);
        this._labelLayer.powerLabel.setVisible(gameVariable.skill.powerCD === 0);
    },
    // handle pause event
    pauseHandle: function () {
        if (gameVariable.gameState === gameDefine.gameState.Playing) {
            gameVariable.gameState = gameDefine.gameState.Pausing;
            cc.audioEngine.pauseMusic();
            this._labelLayer.pauseLabel.setVisible(true);
        }
        else if (gameVariable.gameState === gameDefine.gameState.Pausing) {
            gameVariable.gameState = gameDefine.gameState.Playing;
            cc.audioEngine.resumeMusic();
            this._labelLayer.pauseLabel.setVisible(false);
        }
    }
})