/*!
 * 
 *   melonJS
 *   http://www.melonjs.org
 *		
 *   Step by step game creation tutorial
 *
 **/

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
// the spinning coin spritesheet
}, {
    name: "spinning_coin_gold",
    type: "image",
    src: "data/sprite/spinning_coin_gold.png"
// our enemty entity
}];


var jsApp	= 
{	
	/* ---
	
		Initialize the jsApp
		
		---			*/
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
	   // set the "Play/Ingame" Screen Object
	   me.state.set(me.state.PLAY, new PlayScreen());
	     
	   // add our player entity in the entity pool
	   me.entityPool.add("mainPlayer", PlayerEntity);

	   // add gold coins entity in the entity pool
	   me.entityPool.add("CoinEntity", CoinEntity);
	             
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


/*----------------
 a Coin entity
------------------------ */
var CoinEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
    }
 
});


//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
