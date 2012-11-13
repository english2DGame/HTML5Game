(function (window) {
    function Player(imgPlayer, x_end, y_end) {
        this.initialize(imgPlayer, x_end, y_end);
    }
    Player.prototype = new createjs.BitmapAnimation();

    // public properties:


    // constructor:
    Player.prototype.BitmapAnimation_initialize = Player.prototype.initialize; 

    //unique to avoid overiding base class 
    var quaterFrameSize;
   
    Player.prototype.initialize = function (imgPlayer, x_end, y_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgPlayer], //image to use
            frames: { width:30, height:60, regX:15, regY: 30 },
            animations: {
                walkLeft: [0, 6, "walkLeft", 4],
                walkDown: [7, 13, "walkDown", 4],
                walkUp: [14, 20, "walkUp", 4],
                idle: [7, 7, "walkUp", 4],
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

        this.BitmapAnimation_initialize(localSpriteSheet);
        this.x_end = x_end;
        this.y_end = y_end;

        quaterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;
        // 1 = right & -1 = left
        this.directionX = 0;
        this.directionY = 0;
        // velocity
        this.vX = 3;
        this.vY = 3;
        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 7;
        //Size of the Bounds for the collision's tests
        this.bounds = 28;
        this.hit = this.bounds;
    }

    Player.prototype.tick = function () {
        var newXPosition = this.x + this.vX * this.directionX;
        var newYPosition = this.y + this.vY * this.directionY;

        if (newXPosition > 15 && newXPosition<this.x_end-15)
            this.x = newXPosition;

        if (newYPosition > 30 && newYPosition<this.y_end-30)
            this.y = newYPosition;
    }    

    window.Player = Player;
} (window));