function Action(force) {
	if (force >= 10){
		var random = Math.random();
		if (random > 0.25){
			//le joueur choisit le type de déplacement
		}
		else{
			this.type = 4;
		}
	}else{
		this.type = Math.floor(Math.random()*4) - charisme;
	}

	this.definirNom();
}

Action.prototype.definirnom = function() {    
    switch(this.type)
	{
		case 1:
		  this.nom = "coup de boule";
		  break;
		case 2:
		  this.nom = "coup de pied au cul";
		  break;
		case 3:
		  this.nom = "pousse-pousse";
		  break;
		case 4:
		  this.nom = "bavette";
		  break;
		default:
		  break;
	}
}
