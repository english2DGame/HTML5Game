/*-------------------
a player entity
-------------------------------- */
var PlayerEntity = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
 
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(2,2);

        // adjust the bounding box
        //this.updateColRect(10, 48, 8, 56);

        //this.falling = false;

        // disable gravity
        this.gravity = 0;
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {

        if(me.input.isKeyPressed('left')){
            this.flipX(true);

            if (this.pos.x > 0)
                this.vel.x -= this.accel.x * me.timer.tick;
        }else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            if (this.pos.x < 1280)
                this.vel.x += this.accel.x * me.timer.tick;

        }else if (me.input.isKeyPressed('up')) {
            // update the entity velocity
            if (this.pos.y > 0)
                this.vel.y -= this.accel.y * me.timer.tick;
        }else if (me.input.isKeyPressed('down')) {
            // unflip the sprite
            //this.flipX(false);
            // update the entity velocity
            if (this.pos.y < 480)
                this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.vel.x = 0;
            this.vel.y = 0;
        }

        // check & update player movement
        this.updateMovement();
 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update objet animation
            this.parent(this);
            return true;
        }
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }
 
});


