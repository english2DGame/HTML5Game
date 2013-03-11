function HowRetarded() {  
  if ( HowRetarded.caller != HowRetarded.getInstance ) {  
      throw new Error("This object cannot be instanciated");  
  }

  //nombre de maisons necessaires pour fusee (pour l'instant 3)
  this.nbMaisons = 3;
  this.questions = new Array;
  this.currentQuestion = null;
}  


HowRetarded.prototype.loadQuestions = function() {    
    var xhttp;
    
    if (window.XMLHttpRequest){
      xhttp = new XMLHttpRequest();
    }else{// IE 5/6
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.open("GET","data/questions.xml",false);
    xhttp.send();
    var xmlDoc=xhttp.responseXML;

    var elts = xmlDoc.getElementsByTagName("question")
    for(var i=0; i<elts.length; ++i){
        var type = elts[i].getAttribute("type");
        var r1 = new Answer(elts[i].getAttribute("r1"), true, true);
        var r2 = new Answer(elts[i].getAttribute("r2"), false, true);
        var r3 = new Answer(elts[i].getAttribute("r3"), false, true);
        var r4 = new Answer(elts[i].getAttribute("r4"), false, true);

        var label = elts[i].textContent;

        var tempanswers = new Array( r1 , r2 , r3 , r4);
        var answers = new Array;
        
        while ( tempanswers.length > 0 ){
          var random = Math.floor(Math.random()*tempanswers.length);
          answers.push(tempanswers[random]);
          tempanswers.splice(random, 1);
        }

        var question = new Question(type, label, answers)
        this.questions.push(question)
    }
}




HowRetarded.prototype.init = function(players) {    
    this.loadQuestions();
    this.players = players;
    this.players[3].focused = true;
    this.players[3].lancerDe();
    this.displayBasicInformations(this.players[3])
}


HowRetarded.prototype.getFocusedPlayer = function() {    
    for (var i=0; i< this.players.length; ++i){
      if (this.players[i].focused)
        return this.players[i];
    }
}


HowRetarded.prototype.setCaseAction = function(type) {  
  var player = this.getFocusedPlayer();

  if (type == 1 || type == 2){
    var rand = Math.random();
    if (rand < 0.70){
      $("#display #actus_jeu .last_event").html("New question. Click on an answer.");
      var question = setQuestionByType(this.questions, Math.floor(Math.random()*4)+1 );
      this.setCurrentQuestion(question);
      question.displayQuestion();
    }else{
        var randEvent = Math.floor(Math.random()*5)+1;
        switch(randEvent){
          case 1:
            $("#display #actus_jeu .last_event").html("Kick butt. Go back where you come from !!");
            player.caseX = player.lastCaseX;
            player.caseY = player.lastCaseY;
            var typeCase = getCaseType(player.caseX, player.caseY)
            this.setCaseAction(typeCase);
            break;
          case 2:
            $("#display #actus_jeu .last_event").html("Head-butt. You've got "+player.lastdice+" new movings.");
             $("#display #actus_jeu .dice").html(player.lastdice);
            player.dice = player.lastdice
            break;
          case 3:
            $("#display #actus_jeu .last_event").html("Rickshaw. Move randomly");
            var typeCase=0
            var randX;
            var randY;
            while ( typeCase == 0 ){
              randX = Math.floor(Math.random()*21);
              randY = Math.floor(Math.random()*17)
              typeCase = getCaseType(randX, randY)
            }
            player.caseX = randX;
            player.caseY = randY;
            this.setCaseAction(typeCase);
            break;
          case 4:
            $("#display #actus_jeu .last_event").html("You've got a new secret object");
            player.object = new Object();
            document.getElementById("next_player").style.display = 'block';
            break;
          case 5:
            $("#display #actus_jeu .last_event").html("Chatter spot. You'll pass next turn");
            player.passeProchainTour = true;
            var question = setQuestionByType(this.questions, Math.floor(Math.random()*4)+1 );
            this.setCurrentQuestion(question);
            question.displayQuestion();
            break;
        };

    }
  }else{
    if (type == 3 ){
      $("#display #actus_jeu .last_event").html("Are you ready to go to the Earth ??")
    }else{
      $("#display #actus_jeu .last_event").html("You're on the "+getNameType(type-3)+" house. Click on an answer.")
      var question = setQuestionByType(this.questions, type-3);
      question.inHouse = true;
      this.setCurrentQuestion(question);
      question.displayQuestion();
    }
  }
} 


HowRetarded.prototype.setCurrentQuestion = function(question) {
  this.currentQuestion = question  
}


HowRetarded.prototype.nextPlayer = function() {
  //on remet toutes les réponses a true
  for(var i=0; i<this.questions.length; ++i){
    for (var j=0; j<this.questions[i].answers.length; ++j)
      this.questions[i].answers[j].visible = true;
  }

  var index, nextPlayer;

  for (var i=0; i<this.players.length; ++i){
    if (this.players[i].focused){
      this.players[i].focused = false;
      index = i;
      break;
    }  
  }

  nextPlayer = index+1;
  if (nextPlayer == this.players.length){
    nextPlayer = 0;
  }

  this.players[nextPlayer].focused = true;
  if ( this.players[nextPlayer].passeProchainTour ){
    this.players[nextPlayer].passeProchainTour = false;
    console.log ("bavette : le joueur passe son tour")
    this.nextPlayer();
  }else{
    this.players[nextPlayer].lancerDe();
    this.displayBasicInformations(this.players[nextPlayer])
  }
}


HowRetarded.prototype.displayBasicInformations = function(cur) { 
  var content1 = '<h1>Player informations</h1>\n<p>Actual player : </p><img src="'+cur.url+'"/>\n<p>Obtained houses : </p><ul class="houses">';

  for (var i=1; i<7; ++i){
    var url = 'img/'+getNameType(i)+'.png';
    if ( !cur.wonHouse(i) )
      url = 'img/'+getNameType(i)+'_d.png';
    content1 += '<li class="'+getNameType(i)+'"><img src="'+url+'" /></li>'
  }

  content += '</ul>';


  var content2 = '<h1>Game informations</h1>\n<p>Movings : <span class="dice">'+cur.dice+'</span></p>\n<p>Last event : <span class="last_event">You threw the dice and obtained '+cur.dice+'</span></p>\n<div class="question"></div>';
    
  $("#display #infos_joueur").html(content1);
  $("#display #actus_jeu").html(content2);
  document.getElementById("next_player").style.display = 'none';
}

 
// propriété statique qui contient l'instance unique  
HowRetarded.instance = null;  
  
HowRetarded.getInstance = function() {  
  if (this.instance == null) {  
      this.instance = new HowRetarded();  
  }  
  
  return this.instance;  
} 