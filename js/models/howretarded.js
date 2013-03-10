function HowRetarded() {  
  if ( HowRetarded.caller != HowRetarded.getInstance ) {  
      throw new Error("This object cannot be instanciated");  
  }

  //nombre de maisons necessaires pour fusee (pour l'instant 3)
  this.nbMaisons = 3;
  this.questions = new Array
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
        var r1 = new Answer(elts[i].getAttribute("r1"), true);
        var r2 = new Answer(elts[i].getAttribute("r2"), false);
        var r3 = new Answer(elts[i].getAttribute("r3"), false);
        var r4 = new Answer(elts[i].getAttribute("r4"), false);

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
    if (rand < 0.75){
      console.log("question")
      var question = setQuestionByType(this.questions, Math.floor(Math.random()*4)+1 );
      question.displayQuestion();
    }else{
        var randEvent = Math.floor(Math.random()*5)+1;
        switch(randEvent){
          case 1:
            console.log("coup de boule");
            player.caseX = player.lastCaseX;
            player.caseY = player.lastCaseY;
            var typeCase = getCaseType(player.caseX, player.caseY)
            this.setCaseAction(typeCase);
            break;
          case 2:
            console.log("coup de pied au cul");
            player.dice = player.lastdice
            break;
          case 3:
            console.log("pousse-pousse");
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
            console.log("objet");
            player.object = new Object();
            this.nextPlayer();
            break;
          case 5:
            console.log("bavette");
            player.passeProchainTour = true;
            var question = setQuestionByType(this.questions, Math.floor(Math.random()*4)+1 );
            question.displayQuestion();
            break;
        };

    }
  }else{
    if (type == 3 ){
      console.log("fusee")
    }else{
      console.log("question maison "+ type-3)
      var question = setQuestionByType(this.questions, type-3);
      question.inHouse = true;
      question.displayQuestion();
    }
  }
} 


HowRetarded.prototype.nextPlayer = function() {
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