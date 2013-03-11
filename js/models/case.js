function Case(x, y) {	
	this.positionX = x;
	this.positionY = y;	
}

Case.prototype.getPlayer = function(){
	return HowRetarded.getInstance().getFocusedPlayer();
}


function CaseNormale(x, y){
	Case.call(this, x, y);	
}


function CaseQuestion(x, y){
	CaseNormale.call(this, x, y);
	this.question = new Question( Math.floor(Math.random()*6) + 1 );
}

function CaseObjet(x, y){
	CaseNormale.call(this, x, y);
	this.objet = new Objet(this.getPlayer().charisme);
}

function CaseAction(x, y){
	CaseNormale.call(this, x, y);
	this.action = new Action(this.getPlayer().force);
}



function CaseMaison(x, y, type){
	Case.call(this, x, y);
	this.question = new Question( type );
}

function CaseFusee(x, y){
	Case.call(this, x, y);
	this.questions = new Array(new Question( Math.floor(Math.random()*6) + 1 ), new Question( Math.floor(Math.random()*6) + 1 ), new Question( Math.floor(Math.random()*6) + 1 ));
}






