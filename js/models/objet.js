function Objet() {
	this.type = Math.floor(Math.random()*9);
	this.definirNom();
}

Objet.prototype.definirnom = function() {    
    switch(this.type)
	{
		case 1:
		  this.nom = "un lance-pierre";
		  break;
		case 2:
		  this.nom = "une plume de chatouille aiguisée";
		  break;
		case 3:
		  this.nom = "un bilboquet";
		  break;
		case 4:
		  this.nom = "un canard en plastique";
		  break;
		case 5:
		  this.nom = "un bouquet de fleurs";
		  break;
		case 6:
		  this.nom = "une feuille de salade";
		  break;
		case 7:
		  this.nom = "une gomme";
		  break;
		case 8:
		  this.nom = "une pomme";
		  break;
		case 9:
		  this.nom = "un joli gallet";
		  break;
		default:
		  break;
	}
}
