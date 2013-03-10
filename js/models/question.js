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
        content += '<li><a style="cursor:pointer;" onclick="HowRetarded.getInstance().currentQuestion.repondre('+i+');">'+this.answers[i].label+'</a></li>';
    }
    content += '</ul>';

    $("#display #actus_jeu .question").html(content);
}


Question.prototype.goodAnswerIndex = function() {
    for (var i=0; i<this.answers.length; ++i){
        if (this.answers[i].correct == true)
            return i;
    }
}



Question.prototype.repondre = function(idReponse) {
	var type = Number(this.type)

    if (this.inHouse){    
    	if (idReponse == this.goodAnswerIndex()){
            var p = this.game.getFocusedPlayer()
    		if ( !p.wonHouse(type) ){
                p.winHouse(type);
                $("#display #actus_jeu .last_event").html("You won the "+getNameType(type)+" house !!"); 
                document.getElementById("next_player").style.display = 'block';
                var url = 'img/'+getNameType(type)+'.png'
                $("#infos_joueur ."+getNameType(type)+" img").attr('src',url);


            }else{
                $("#display #actus_jeu .last_event").html("Congratulations, but you already have this house"); 
            }
        }
    	else{
    		$("#display #actus_jeu .last_event").html("Sorry, wrong answer");            
    	}
        document.getElementById("next_player").style.display = 'block';
    }else{
    	if (idReponse == this.goodAnswerIndex()){
            $("#display #actus_jeu .last_event").html("That's a good answer. You get points !!");
            this.game.getFocusedPlayer().obtenirPoints( this.pointsComp, this.pointsCar) ;
            document.getElementById("next_player").style.display = 'block';
        }    		
    	else{
    		if (this.pointsCar == 2 ){
    			this.pointsCar -- ;
    			this.pointsComp --;
    			this.enleverReponse();
    			this.displayQuestion();
    		}else{
    			if (this.pointsCar == 1 ){
    				this.pointsCar -- ;
    				this.enleverReponse();
    				this.displayQuestion();
    			}
    			else{
    				document.getElementById("next_player").style.display = 'block';
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
    $("#display #actus_jeu .last_event").html("One answer has been removed");

}



