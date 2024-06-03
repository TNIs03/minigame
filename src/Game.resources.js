Game.res = {
    HelloWorld_png : "HelloWorld.png",
    background_png : "res/background.png",
    bird_png : "res/bird.png",
    ground_png : "res/ground.png",
    pipe_png : "res/pipe.png",
    flappy_ttf: "Flappy",
};

Game.g_resources = [];

for ( var i in Game.res ) {
    Game.g_resources.push( Game.res[i] );
}