function Question(type) {
	this.type = type;
	this.definirQuestion(type);
	this.pointsComp = 2;
	this.pointsCar = 2;
    this.game = HowRetarded.getInstance();
}

Question.prototype.definirQuestion = function(type) {    
    //selectionner la question dans la bdd en fonction de son type
    /*
    initialiser les variables*/    
    this.texte = "Quelle est ta couleur preferee ?";
    this.reponses = new Array("vert", "jaune", "bleu", "rouge");
   	this.bonneReponse = 2;   	

}

Question.prototype.afficherQuestion = function(type) {    
    //a remplir
}

Question.prototype.repondre = function(idReponse, maison) {
	if (maison){    
    	if (idReponse == this.bonneReponse){
            //le joueur obtient la maison
    		this.game.getFocusedPlayer().gagnerMaison(this.type);
        }
    	else{
    		//le joueur passe la main
            this.game.nextPlayer()
    	}
    }else{
    	if (idReponse == this.bonneReponse){
            //le joueur obtient les points
            this.game.getFocusedPlayer().obtenirPoints( this.pointsComp, this.pointsCar) ;
        }    		
    	else{
    		if (this.pointsCar == 2 ){
    			this.pointsCar -- ;
    			this.pointsComp --;
    			this.enleverReponse();
    			this.afficherQuestion();
    		}else{
    			if (this.pointsCar == 1 ){
    				this.pointsCar -- ;
    				this.enleverReponse();
    				this.afficherQuestion();
    			}
    			else{
    				//le joueur n,obtient pas de point et passe la main
    			}
    		}
    	}
    }
}

Question.prototype.verifierReponse = function(idReponse, maison) {
	return idReponse == this.bonneReponse;
}

Question.prototype.enleverReponse = function() {    
	var random = this.bonneReponse;
	while (random == this.bonneReponse)
		random = Math.floor(Math.random()*this.reponses.length);

	this.reponses.splice(random, 1);
	if (random < this.bonneReponse)
		this.bonneReponse --;
}



