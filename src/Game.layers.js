
Game.layers[1].extend = cc.Layer.extend({
    init: function () {
        this._super();
        var game = this;
        Game.layers[1].start( game );
    }
});

Game.layers[1].start = function( game ){
    //init game res
    var winSize = cc.director.getWinSize();
    var _backgroundLayer = new BackgroundLayer();
    var _groundLayer = new GroundLayer();
    var _birdLayer = new BirdLayer(winSize);
    var _pipeLayer = new PipeLayer();
    var _labelLayer = new LabelLayer(winSize);
    var _gameController = new GameController(_labelLayer, _birdLayer, _pipeLayer, _groundLayer);
    var _keyboardListener = new KeyboardListener(_gameController);

    // add all child layers to parent layer
    game.addChild(_keyboardListener);
    game.addChild(_backgroundLayer, -1);
    game.addChild(_groundLayer, 2);
    game.addChild(_pipeLayer, 1);
    game.addChild(_birdLayer, 3);
    game.addChild(_labelLayer, 4);

    cc.audioEngine.playMusic(gameDefine.audio.marios_way_mp3, true);

    //game loop
    game.schedule(update);



    // update if called every frame
    function update(dt) {

        if (gameVariable.gameState === gameDefine.gameState.Playing || gameVariable.gameState === gameDefine.gameState.Waiting
            || gameVariable.gameState === gameDefine.gameState.Counting) {
            _backgroundLayer.update();
            _groundLayer.update();
        }
        _gameController.update(dt);

        if (gameVariable.gameState === gameDefine.gameState.Playing) {
            _birdLayer.update();
            _pipeLayer.update();
            if (gameVariable.gameOver) endGame();
        }
    }

    // endGame call when game over
    function endGame() {
        cc.audioEngine.playEffect(gameDefine.audio.hurt_wav, false);
        var pos = _birdLayer.bird.getPosition();
        var delay = cc.delayTime(0.2);
        var moveDown = cc.moveTo((pos.y + 30) / 200 * 0.5, pos.x, gameVariable.skill.powerTime === 0 ? -30 : -100);
        var sequence = cc.sequence(delay, moveDown);
        _birdLayer.bird.runAction(sequence);
        _labelLayer.endLabel.setString("Game Over\nScore: " + gameVariable.score + "\nPress Enter to play again");
        _labelLayer.endLabel.setVisible(true);
        gameVariable.gameState = gameDefine.gameState.Ended;
    }

};


function random(fromNum, toNum) {
    return Math.floor(Math.random()*(toNum - fromNum + 1)) + fromNum;
}
