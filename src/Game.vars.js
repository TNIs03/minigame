Game = {};
Game.scenes = [];
Game.scenes[1] = {};
Game.layers = [];
Game.layers[1] = {};

Game.def = {
    bird: {
        x: 280,
        y: 320,
        initVelocityX: 2.5,
        dashVelocityX: 10,
        initScale: 1,
        powerScale: 5,
        normalOffset: {
            x: 8,
            y: 4,
            width: 15,
            height: 8,
        },
        powerOffset: {
            x: 40,
            y: 20,
            width: 75,
            height: 40,
        }
    },
    move: {
        gravity: 0.06,
        jumpVelocityY: 2.8,
    },
    background: {
        width: 830,
        height: 288,
        offsetRatio: 0.5,
    },
    pipe: {
        initPosX: 1500,
        spaceBetween: 400,
        spaceRandomMin: -50,
        spaceRandomMax: 50,
        gapMin: 120,
        gapMax: 160,
        yMin: -300,
        yMax: -50,
    },
    gameState: {
        Waiting: 0,
        Counting: 1,
        Playing: 2,
        Pausing: 3,
        Ended: 4,
    },
    textOffset: {
        centerY: 100,
        topleftX: 50,
        topleftY: 50,
        dashY: 100,
        powerY: 150,
    },
    countdownTime: 2,
    skill: {
        initDashCD: 2,
        initDashTime: 0.1,
        initPowerCD: 2,
        initPowerTime: 5,
    },
    audio: {
        jump_wav: "res/jump.wav",
        hurt_wav: "res/hurt.wav",
        marios_way_mp3: "res/marios_way.mp3",
        score_wav: "res/score.wav",
        explosion_wav: "res/explosion.wav",
    }
}

Game.contr = {
    isStarted: false,
    velocityX: Game.def.bird.initVelocityX,
    velocityY: 0,
    key: {
        enter: false,
        w: false,
        p: false,
        a: false,
        d: false,
        up: false,
        left: false,
        down: false,
    },
    curPipe: 0,
    score: 0,
    gameOver: false,
    gameState: Game.def.gameState.Waiting,
    skill: {
        dashCD: Game.def.skill.initDashCD,
        dashTime: 0,
        powerCD: Game.def.skill.initPowerCD,
        powerTime: 0,
    }
}