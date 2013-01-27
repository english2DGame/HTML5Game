function HowRetarded() {  
  if ( HowRetarded.caller != HowRetarded.getInstance ) {  
      throw new Error("This object cannot be instanciated");  
  }  
}  

HowRetarded.prototype.init = function(type) {    
    this.plateau = new Plateau();
    //recuperer le nombre de joueurs, pour l'instant 1
    this.player = new Player();
}

  
// propriété statique qui contient l'instance unique  
HowRetarded.instance = null;  
  
HowRetarded.getInstance = function() {  
  if (this.instance == null) {  
      this.instance = new HowRetarded();  
  }  
  
  return this.instance;  
} 