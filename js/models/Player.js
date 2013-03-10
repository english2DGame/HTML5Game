function Player(imgPlayer, index) {
    switch(index){
        case 0:
            this.name = 'red';
            break;
        case 1:
            this.name = 'blue';
            break;
        case 2:
            this.name = 'yellow';
            break;
        case 3:
            this.name = 'green';
            break;
    }

    this.caseX = 3;
    this.caseY = 15;
    this.lastCaseX = this.caseX;
    this.lastCaseY = this.caseY;
    this.dice = 0;
    this.lastdice = 0;

    this.focused = false;
    this.force = 0;
    this.vitesse = 0;
    this.charisme = 0;
    this.dramaturgie = 0;
    this.mainVerte = 0;
    this.cordonBleu = 0;
    this.melomanie = 0;
    this.acrobate = 0;
    this.gamer = 0;
    this.pointsComp = 0;
    this.pointsCar = 0;
    this.objet = null;
    this.passeProchainTour = false;

      
    //type 1
    this.maisonCuisine = false;
    //type 2
    this.maisonJardin = false; 
    //type 3
    this.maisonCinema = false; 
    //type 4     
    this.maisonMusique = false; 
    //type 5
    this.maisonSport = false;
    //type 6
    this.maisonJV = false;    
    

    this.bmp = new createjs.Bitmap(imgPlayer);
    this.bmp.x = this.caseX * 50;
    this.bmp.y = this.caseY * 50;

    

}


Player.prototype.lancerDe = function(){
    this.dice = Math.floor(Math.random()*6) + 1;
    this.lastdice = this.dice;
}

Player.prototype.gagnerMaison = function(type){ 
    switch(type)
    {
        case 1:
          this.maisonCinema = true;
          break;
        case 2:
          this.maisonCuisine = true;
          break;
        case 3:
          this.maisonJardin = true;
          break;
        case 4:
          this.maisonJV = true;
          break;
        case 5:
          this.maisonMusique = true; 
          break;
        case 6:
          this.maisonSport = true;
          break;        
        default:
          break;
    } 
}

Player.prototype.obtenirPoints = function(pointsComp, pointsCar){ 
    this.pointsComp = pointsComp;
    this.pointsCar = pointsCar;
}

Player.prototype.fuseeAutorisee = function(){ 
    return ( ( this.maisonCinema + this.maisonCuisine + this.maisonJardin + this.maisonJV + this.maisonMusique + this.maisonSport ) >= HowRetarded.getInstance().nbMaisons );
}

