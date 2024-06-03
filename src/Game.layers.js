
Game.layers[1].extend = cc.Layer.extend({
    init: function () {
        this._super();
        var game = this;
        Game.layers[1].start( game );
    }
});

Game.layers[1].start = function( game ){
    //init game res
    // cc.audioEngine.init();
    var winSize = cc.director.getWinSize();
    var _backgroundLayer = new BackgroundLayer();
    var _groundLayer = new GroundLayer();
    var _bird = new Bird(winSize);
    var _birdShadow1 = new BirdShadow(_bird, 80, 10);
    var _birdShadow2 = new BirdShadow(_bird, 60, 20);
    var _pipeLayer = new PipeLayer();
    var _labelLayer = new LabelLayer(winSize);
    var _gameController = new GameController(_labelLayer, _bird, _pipeLayer, _groundLayer);
    var _keyboardListener = new KeyboardListener(_gameController);


    game.addChild(_keyboardListener);
    game.addChild(_backgroundLayer, -1);
    game.addChild(_groundLayer, 2);
    game.addChild(_pipeLayer, 1);
    game.addChild(_bird, 3);
    game.addChild(_birdShadow1, 2);
    game.addChild(_birdShadow2, 1);
    game.addChild(_labelLayer, 4);

    // var drawNode = new cc.DrawNode();
    // game.addChild(drawNode);
    //
    // var rectColor = cc.color(255, 0, 0);
    //game loop
    game.schedule(update);



    function update(dt) {

        // drawBoundingBox(_groundLayer.curGround);
        if (Game.contr.gameState === Game.def.gameState.Playing || Game.contr.gameState === Game.def.gameState.Waiting
            || Game.contr.gameState === Game.def.gameState.Counting) {
            _backgroundLayer.update();
            _groundLayer.update();
        }
        _gameController.update(dt);

        if (Game.contr.gameState === Game.def.gameState.Playing) {
            _bird.update(dt);
            _birdShadow1.update();
            _birdShadow2.update();
            _pipeLayer.update();
            if (Game.contr.gameOver) endGame();
        }

    }

    function endGame() {
        cc.audioEngine.playEffect(Game.def.audio.hurt_wav, false);
        _labelLayer.endLabel.setString("Game Over\nScore: " + Game.contr.score + "\nPress Enter to play again");
        _labelLayer.endLabel.setVisible(true);
        Game.contr.gameState = Game.def.gameState.Ended;
    }

    // function drawBoundingBox(_bird) {
    //     var boundingBox = _bird.getRealBoundingBox(); // Red color for the bounding box
    //
    //     // Draw the bounding box using four lines
    //     var topLeft = cc.p(boundingBox.x, boundingBox.y + boundingBox.height);
    //     var topRight = cc.p(boundingBox.x + boundingBox.width, boundingBox.y + boundingBox.height);
    //     var bottomLeft = cc.p(boundingBox.x, boundingBox.y);
    //     var bottomRight = cc.p(boundingBox.x + boundingBox.width, boundingBox.y);
    //
    //     drawNode.clear();
    //     drawNode.drawSegment(topLeft, topRight, 1, rectColor);
    //     drawNode.drawSegment(topRight, bottomRight, 1, rectColor);
    //     drawNode.drawSegment(bottomRight, bottomLeft, 1, rectColor);
    //     drawNode.drawSegment(bottomLeft, topLeft, 1, rectColor);
    // }

};


function random(fromNum, toNum) {
    return Math.floor(Math.random()*(toNum - fromNum + 1)) + fromNum;
}
