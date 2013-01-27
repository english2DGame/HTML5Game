function Case(x, y) {	
	this.positionX = x;
	this.positionY = y;
}

function CaseFusee(x, y){
	Case.call(this, x, y);
	this.questions = new Array(new Question( Math.floor(Math.random()*6) + 1 ), new Question( Math.floor(Math.random()*6) + 1 ), new Question( Math.floor(Math.random()*6) + 1 ));
}

function CaseQuestion(x, y){
	Case.call(this, x, y);
	this.question = new Question( Math.floor(Math.random()*6) + 1 );
}

function CaseObjet(x, y){
	Case.call(this, x, y);
	this.objet = new Objet(/*créer l'objet en fct du charisme*/);
}

function CaseAction(x, y){
	Case.call(this, x, y);
	this.action = new Action(/*créer l'objet en fct du charisme*/);
}

function CaseMaison(x, y, type){
	Case.call(this, x, y);
	this.question = new Question( type );
}






