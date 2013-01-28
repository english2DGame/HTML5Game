// game resources
var g_resources = [{
    name: "tiles_test",
    type: "image",
    src: "data/area01_tileset/tiles_test.png"
}, {
    name: "area01",
    type: "tmx",
    src: "data/area01.tmx"
}, {
    name: "jelly_bean",
    type: "image",
    src: "data/sprite/jelly_bean.png"
}, {
    name: "jelly_bean2",
    type: "image",
    src: "data/sprite/jelly_bean2.png"
}, {
    name: "jelly_bean3",
    type: "image",
    src: "data/sprite/jelly_bean3.png"
}, {
    name: "jelly_bean4",
    type: "image",
    src: "data/sprite/jelly_bean4.png"
}];


var jsApp	= 
{	
	/* Initialize the jsApp */
	onload: function()
	{
		// init the video
		if (!me.video.init('jsapp', 640, 480, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
         	return;
		}
				
		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	
	/* ---
 
   callback when everything is loaded
     
   ---  */
     
	loaded: function ()
	{
		var game = HowRetarded.getInstance();
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());

		for (var i=0; i<game.nbPlayers; ++i){
			var playerEntity = game.players[i].playerEntity;
			// add our player entity in the entity pool
			me.entityPool.add("player"+(i+1), playerEntity );
		}		
		
		// enable the keyboard
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,  "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");

		//see the boundingBox
		//me.debug.renderHitBox = true;
		  
		// start the game
		me.state.change(me.state.PLAY);

	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
	{	
      // stuff to reset on state change
		me.levelDirector.loadLevel("area01");
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
	
   }

});





//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
	HowRetarded.getInstance().init();
});


