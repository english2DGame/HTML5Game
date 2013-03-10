function Question(type, label, answers) {
	this.type = type;
    this.label = label;
    this.answers = answers;
    this.inHouse = false;
	this.pointsComp = 2;
	this.pointsCar = 2;
    this.game = HowRetarded.getInstance();
}




Question.prototype.displayQuestion = function() {
    var content = '<p>'+this.label+'</p>\n<ul>';
    for (var i=0; i<this.answers.length; ++i){
        content += '<li>'+this.answers[i].label+'</li>';
    }
    content += '</ul>';


    $("#display").html(content);
}


Question.prototype.goodAnswerIndex = function() {
    for (var i=0; i<this.answers.length; ++i){
        if (this.answer[i].correct == true)
            return i;
    }
}



Question.prototype.repondre = function(idReponse) {
	if (this.inHouse){    
    	if (idReponse == this.goodAnswer){
            //le joueur obtient la maison
    		this.game.getFocusedPlayer().gagnerMaison(this.type);
        }
    	else{
    		//le joueur passe la main
            this.game.nextPlayer()
    	}
    }else{
    	if (idReponse == this.goodAnswer){
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
	return idReponse == this.goodAnswer;
}

Question.prototype.enleverReponse = function() {    
	var random = this.goodAnswerIndex();
	while (random == this.goodAnswerIndex())
		random = Math.floor(Math.random()*this.answers.length);
	this.answers.splice(random, 1);

}



