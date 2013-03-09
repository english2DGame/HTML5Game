function HowRetarded() {  
  if ( HowRetarded.caller != HowRetarded.getInstance ) {  
      throw new Error("This object cannot be instanciated");  
  }

  //nombre de joueurs 
  this.nbPlayers = 4;

  //nombre de maisons necessaires pour fusee (pour l'instant 3)
  this.nbMaisons = 3;
}  

HowRetarded.prototype.init = function() {    
    this.plateau = new Plateau();
    //recuperer le nombre de joueurs, pour l'instant 2
    this.players = new Array;
    for (var i=0; i<this.nbPlayers; ++i){
      this.players.push( new Player() );
    }
    this.players[0].focused = true;


}


HowRetarded.prototype.getFocusedPLayer = function(type) {    
    for (player in this.players){
      if (player.focused)
        return player;
    }
}


HowRetarded.prototype.nextPlayer = function() {
  var i = 0;    
  for (player in this.players){
    ++i;
    if (player.focused){
      player.focused = false;
      if (i == this.players.length)
        i=0;
      this.players[i].focused = false;
      //updater l'affichage
      return;
    }      
  }
}

  
// propriété statique qui contient l'instance unique  
HowRetarded.instance = null;  
  
HowRetarded.getInstance = function() {  
  if (this.instance == null) {  
      this.instance = new HowRetarded();  
  }  
  
  return this.instance;  
} 