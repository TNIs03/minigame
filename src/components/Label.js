var LabelLayer = cc.Layer.extend({
    countingLabel: null,
    startLabel: null,
    scoreLabel: null,
    endLabel: null,
    dashLabel: null,
    powerLabel: null,
    pauseLabel: null,
    ctor: function (winSize) {
        this._super();
        this.init(winSize);
    },
    init: function (winSize) {
        this.countingLabel = new Label("", 32, winSize, "countingLabel", "center", false);
        this.addChild(this.countingLabel, 0);

        this.startLabel = new Label("Press Enter to start\n\n\n\nInstruction:\nJump: W/Up Arrow\n" +
            "Dash: D/Right Arrow\nPower: A/Left Arrow\nPause: P", 32, winSize, "startLabel", "center", true);
        this.startLabel.setPositionY(winSize.height / 2);
        this.addChild(this.startLabel, 0);

        this.scoreLabel = new Label("0", 32, winSize, "scoreLabel", "topleft", false);
        this.addChild(this.scoreLabel, 0);

        this.endLabel = new Label("", 32, winSize, "endLabel", "center", false);
        this.addChild(this.endLabel, 0);

        this.dashLabel = new Label("Dash", 32, winSize, "endLabel", "topleft", false);
        this.dashLabel.setPositionY(winSize.height - gameDefine.textOffset.dashY);
        this.addChild(this.dashLabel, 0);

        this.powerLabel = new Label("Power", 32, winSize, "endLabel", "topleft", false);
        this.powerLabel.setPositionY(winSize.height - gameDefine.textOffset.powerY);
        this.addChild(this.powerLabel, 0);

        this.pauseLabel = new Label("Game Paused\nPress P to continue", 32, winSize, "pauseLabel", "center", false);
        this.addChild(this.pauseLabel, 0);
    },
    counting: function () {
        var countdownTime = gameDefine.countdownTime;
        var countingLabel = this.countingLabel;
        countingLabel.setVisible(true);
        for (let i = countdownTime; i>0; i--) {
            setTimeout(function () {
                countingLabel.setString(i.toString());
            }, 1000*(countdownTime-i));
        }
        setTimeout(function () {
            countingLabel.setVisible(false);
        }, 1000 * countdownTime);
    },

})

var Label = cc.LabelTTF.extend({
    ctor: function (text, fontSize, winSize, tag, format, visible) {
        this._super(text, Game.res.flappy_ttf, fontSize);
        this.attr({
            anchorX: (format === "center" ? 0.5 : format === "topleft" ? 0 : 0),
            anchorY: (format === "center" ? 0.5 : format === "topleft" ? 1 : 0),
            x: format === "center" ? winSize.width / 2 :
                format === "topleft" ? gameDefine.textOffset.topleftX : 0,
            y: format === "center" ? winSize.height / 2 + gameDefine.textOffset.centerY :
                format === "topleft" ? winSize.height - gameDefine.textOffset.topleftY : 0,
            tag: tag,
            visible: visible,
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
        })
    }
})