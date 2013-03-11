function Question(type, label, answers) {
	this.type = type;
    this.label = label;
    this.answers = answers;
    this.inHouse = false;
    this.points = 4
	//this.pointsComp = 2;
	//this.pointsCar = 2;
    this.game = HowRetarded.getInstance();
}


Question.prototype.displayQuestion = function() {
    var content = '<p>'+this.label+'</p>\n<ul>';
    for (var i=0; i<this.answers.length; ++i){
        if (this.answers[i].visible)
            content += '<li id="answer'+i+'" style="display:block;"><a style="cursor:pointer;" onclick="HowRetarded.getInstance().currentQuestion.repondre('+i+');">'+this.answers[i].label+'</a></li>';
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
    var p = this.game.getFocusedPlayer()

    if (this.inHouse){    
    	if (idReponse == this.goodAnswerIndex()){
            
    		if ( !p.wonHouse(type) ){
                p.winHouse(type);
                $("#display #actus_jeu .last_event").html("You won the "+getNameType(type)+" house !!");
                $("#display #actus_jeu .question").html('');
                document.getElementById("next_player").style.display = 'block';
                var url = 'img/'+getNameType(type)+'.png'
                $("#infos_joueur ."+getNameType(type)+" img").attr('src',url);


            }else{
                $("#display #actus_jeu .last_event").html("Congratulations, but you already have this house"); 
            }
        }
    	else{
    		$("#display #actus_jeu .last_event").html("Sorry, wrong answer");
            $("#display #actus_jeu .question").html('');            
    	}
        document.getElementById("next_player").style.display = 'block';
    }else{
    	if (idReponse == this.goodAnswerIndex()){
            player.points += this.points
            $("#display #actus_jeu .last_event").html("That's a good answer. You get "+this.points+" points !!");
            $("#infos_joueur .points").html(p.points)
            $("#display #actus_jeu .question").html('');
            document.getElementById("next_player").style.display = 'block';
        }    		
    	else{
    		if (this.answers[0].visible + this.answers[1].visible + this.answers[2].visible + this.answers[3].visible > 2 ){
                if (this.points == 4)
                    this.points = 2;
                else{
                    this.points --;
                }
    			this.enleverReponse();
    			this.displayQuestion();
    		}else{
                $("#display #actus_jeu .last_event").html("You didn't find the good answer.");
                $("#display #actus_jeu .question").html('');
				document.getElementById("next_player").style.display = 'block';
			}
		}
	}
}


Question.prototype.verifierReponse = function(idReponse, maison) {
	return idReponse == this.goodAnswer;
}

Question.prototype.enleverReponse = function() {    
	var random = this.goodAnswerIndex();
	while (random == this.goodAnswerIndex() || !this.answers[random].visible)
		random = Math.floor(Math.random()*4);

	this.answers[random].visible = false;
    $("#display #actus_jeu .last_event").html("One answer has been removed");

}



