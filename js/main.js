var KEYCODE_UP = 38; 	
var KEYCODE_LEFT = 37; 	
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;

var canvas;
var stage;
var screen_width;
var screen_height;

var player;
var contentManager;




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

	var background = new createjs.Bitmap(contentManager.imgBackground);
	stage.addChild(background);	

    // Notre héros peut être déplacé
    document.onkeydown = handleKeyDown;

    var players = new Array;

    for (var i=0; i<contentManager.imgPlayerArray.length; ++i){
      var p = new Player( contentManager.imgPlayerArray[i], i );
      players.push( p );
      stage.addChild(p.bmp)      
    }

    var instance = HowRetarded.getInstance();
    instance.init(players);
    player = instance.getFocusedPlayer(); 

    /*var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'data/son.ogg');
    audioElement.loop = true;
    audioElement.play();*/

    // otherwise we could use Ticker.addListener(stage);
	createjs.Ticker.addListener(window);
    // Best Framerate targeted (60 FPS)
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);      
}


function tick() {
    player = HowRetarded.getInstance().getFocusedPlayer();
    player.bmp.x = player.caseX*50;
    player.bmp.y = player.caseY*50;

	stage.update();
}

function handleKeyDown(e) {
    //cross browser issues exist
    if (!e) 
    	{ var e = window.event; }

    if (player.dice > 0){
        var type;
        switch (e.keyCode) {
            case KEYCODE_LEFT:
                if (player.caseX > 0){
                    type = getCaseType(player.caseX-1, player.caseY)
                    if (type > 0 ){
                        player.lastCaseX = player.caseX;
                        player.caseX --;
                        player.dice --;
                    }
                }
     			break;
    		 case KEYCODE_RIGHT:
                if (player.caseX < 20){
                    type = getCaseType(player.caseX+1, player.caseY)
                    if (type > 0 ){
                        player.lastCaseX = player.caseX;
                        player.caseX ++;
                        player.dice --;
                    }
                }
                break;
            case KEYCODE_DOWN:
                if (player.caseX < 16){
                    type = getCaseType(player.caseX, player.caseY+1)
                    if (type > 0 ){
                        player.lastCaseY = player.caseY;
                        player.caseY ++;
                        player.dice --;
                    }
                }
                break;
            case KEYCODE_UP:
                if (player.caseY > 0){
                    type = getCaseType(player.caseX, player.caseY-1)
                    if (type > 0 ){
                        player.lastCaseY = player.caseY;
                        player.caseY --;
                        player.dice --;
                    }
                }
                break;
        }

        $("#display #actus_jeu .dice").html(player.dice);


        if (player.dice == 0){
            HowRetarded.getInstance().setCaseAction(type);            
        }

    }

    
}


