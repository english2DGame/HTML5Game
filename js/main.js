var KEYCODE_UP = 38; 	
var KEYCODE_LEFT = 37; 	
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;

var canvas;
var stage;
var screen_width;
var screen_height;
var background;
var backgroundMask;
var player;
var contentManager;

var down = false;


function init() {
    // on récupère l’instance du canvas puis on charge les images 
    canvas = document.getElementById("testCanvas");

    // création de l’objet Stage que l’on fait pointer vers notre canvas 
    stage = new createjs.Stage(canvas);

    // on récupère la largeur et la hauteur du canvas pour de futurs calculs savants 
    screen_width = canvas.width;
    screen_height = canvas.height;

    contentManager = new ContentManager(stage, screen_width, screen_height);
    //on indique que la fonction startGame est celle qu'on souhaite appeller a la fin du telechargement
    contentManager.SetDownloadCompleted(startGame);
    //on commence le téléchargement
    contentManager.StartDownload();
}


function startGame() {

	background = new createjs.Bitmap(contentManager.imgBackground);
	stage.addChild(background);
	

    // Notre héros peut être déplacé avec les flèches (gauche, droite) 
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    // On créé le héros
    player = new Player(contentManager.imgPlayer, screen_width, screen_height);
    player.x = 30;
    player.y = 360;

    stage.addChild(player);

    // otherwise we could use Ticker.addListener(stage);
	createjs.Ticker.addListener(window);
    // Best Framerate targeted (60 FPS)
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
}

function tick() {

	player.tick();
	stage.update();
}

function handleKeyDown(e) {
    //cross browser issues exist
    if (!e) 
    	{ var e = window.event; }
    if(!down){
	    switch (e.keyCode) {
	        case KEYCODE_LEFT:
            	player.gotoAndPlay("walkLeft");
                player.directionX = -1;
                player.directionY = 0;
				break;
			 case KEYCODE_RIGHT:
            	player.gotoAndPlay("walkLeft_h");
                player.directionX = 1;
                player.directionY = 0;
				break;
	        case KEYCODE_DOWN:
        		player.gotoAndPlay("walkDown");
                player.directionX = 0;
                player.directionY = 1;
				break;
	        case KEYCODE_UP:
	            player.gotoAndPlay("walkUp");
	            player.directionX = 0;
	                player.directionY = -1;
				break;

	    }
	    down = true;
	}
}

function handleKeyUp(e) {
	down = false;
	player.stop();
	player.directionX = 0;
	player.directionY = 0;
}
