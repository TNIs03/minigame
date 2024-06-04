var KeyboardListener = cc.Layer.extend({
    _gameController: null,
    ctor: function (_gameController) {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.onKeyPressed.bind(this),
            onKeyReleased: this.onKeyReleased.bind(this),
        }, this);
        this._gameController = _gameController;
    },

    onKeyPressed: function (keyCode) {
        // Handle key press event
        switch (keyCode) {
            case cc.KEY.enter:
                this._gameController.onEnterPressed();
                break;
            case cc.KEY.w:
                if (!gameVariable.key.w && !gameVariable.key.up) this._gameController._birdLayer.bird.jump();
                gameVariable.key.w = true;
                break;
            case cc.KEY.up:
                if (!gameVariable.key.w && !gameVariable.key.up) this._gameController._birdLayer.bird.jump();
                gameVariable.key.up = true;
                break;
            case cc.KEY.right:
            case cc.KEY.d:
                if (gameVariable.gameState === gameDefine.gameState.Playing && gameVariable.skill.dashCD === 0)
                    this._gameController._birdLayer.bird.dash();
                break;
            case cc.KEY.left:
            case cc.KEY.a:
                if (gameVariable.gameState === gameDefine.gameState.Playing && gameVariable.skill.powerCD === 0)
                    this._gameController._birdLayer.bird.power();
                break;
            case cc.KEY.p:
                if (!gameVariable.key.p) this._gameController.pauseHandle();
                gameVariable.key.p = true;
                break;
            default:
                break;
        }
    },

    onKeyReleased: function (keyCode) {
        // Handle key release event
        switch (keyCode) {
            case cc.KEY.w:
                gameVariable.key.w = false;
                break;
            case cc.KEY.up:
                gameVariable.key.up = false;
                break;
            case cc.KEY.p:
                gameVariable.key.p = false;
                break;
            default:
                break;
        }
    }
});