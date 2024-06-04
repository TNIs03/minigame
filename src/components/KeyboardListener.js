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
                if (!Game.contr.key.w && !Game.contr.key.up) this._gameController._birdLayer.bird.jump();
                Game.contr.key.w = true;
                break;
            case cc.KEY.up:
                if (!Game.contr.key.w && !Game.contr.key.up) this._gameController._birdLayer.bird.jump();
                Game.contr.key.up = true;
                break;
            case cc.KEY.right:
            case cc.KEY.d:
                if (Game.contr.gameState === Game.def.gameState.Playing && Game.contr.skill.dashCD === 0)
                    this._gameController._birdLayer.bird.dash();
                break;
            case cc.KEY.left:
            case cc.KEY.a:
                if (Game.contr.gameState === Game.def.gameState.Playing && Game.contr.skill.powerCD === 0)
                    this._gameController._birdLayer.bird.power();
                break;
            case cc.KEY.p:
                if (!Game.contr.key.p) this._gameController.pauseHandle();
                Game.contr.key.p = true;
                break;
            default:
                break;
        }
    },

    onKeyReleased: function (keyCode) {
        // Handle key release event
        switch (keyCode) {
            case cc.KEY.w:
                Game.contr.key.w = false;
                break;
            case cc.KEY.up:
                Game.contr.key.up = false;
                break;
            case cc.KEY.p:
                Game.contr.key.p = false;
                break;
            default:
                break;
        }
    }
});