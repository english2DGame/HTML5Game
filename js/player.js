function Player() {

    this.focused = true;
    this.force = 0;
    this.vitesse = 0;
    this.charisme = 0;
    this.dramaturgie = 0;
    this.mainVerte = 0;
    this.cordonBleu = 0;
    this.melomanie = 0;
    this.acrobate = 0;
    this.gamer = 0;
    this.points = 0;
    this.objet = null;
    this.passeProchainTour = false;

    this.maisonCinema = false;  
    this.maisonMusique = false;
    this.maisonJardin = false;  
    this.maisonCuisine = false;
    this.maisonJV = false;  
    this.maisonSport = false;

    /*-------------------
    a player entity
    -------------------------------- */
    this.playerEntity = me.ObjectEntity.extend({
     
        /* constructor */
        init: function(x, y, settings) {
            // call the constructor
            this.parent(x, y, settings);
     
            // disable gravity
            this.gravity = 0;

            // set the display to follow our position on both axis
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
     
        },
     
        /* update the player pos */
        update: function() {

            // check & update player movement
            this.updateMovement(); 
        
            // else inform the engine we did not perform
            // any update (e.g. position, animation)
            return false;
        }
     
    });
}

Player.prototype.lancerDe = function(){
    var random = Math.floor(Math.random()*6) + 1;
    //highlighter les cases possibles pour le déplacement
}

Player.prototype.setPosition = function(x, y){ 
    //modifier la position du bonhome en fonction
    this.pos.x = x*32;
    this.pos.y = y*32; 
}

