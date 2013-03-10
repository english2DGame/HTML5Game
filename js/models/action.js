function Action() {
	this.type = Math.floor(Math.random()*4);
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
