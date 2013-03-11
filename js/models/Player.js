function Player(imgPlayer, index) {
    switch(index){
        case 0:
            this.name = 'red';
            this.url = 'img/persorouge.png'
            break;
        case 1:
            this.name = 'blue';
            this.url = 'img/persobleu.png'
            break;
        case 2:
            this.name = 'yellow';
            this.url = 'img/persojaune.png'
            break;
        case 3:
            this.name = 'green';
            this.url = 'img/persovert.png'
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
    this.points = 0;
    this.pointsComp = 0;
    this.pointsCar = 0;
    this.objet = null;
    this.passeProchainTour = false;

      
    //type 1
    this.cookingHouse = false;
    //type 2
    this.gardeningHouse = false; 
    //type 3
    this.moviesHouse = false; 
    //type 4     
    this.musicHouse = false; 
    //type 5
    this.sportHouse = false;
    //type 6
    this.videogamesHouse = false;    
    

    this.bmp = new createjs.Bitmap(imgPlayer);
    this.bmp.x = this.caseX * 50;
    this.bmp.y = this.caseY * 50;

    

}


Player.prototype.lancerDe = function(){
    this.dice = Math.floor(Math.random()*6) + 1;
    this.lastdice = this.dice;
}

Player.prototype.winHouse = function(type){ 
    switch(type)
    {
        case 1:
          this.cookingHouse = true;
          break;
        case 2:
          this.gardeningHouse = true;
          break;
        case 3:
          this.moviesHouse = true;
          break;
        case 4:
          this.musicHouse = true;
          break;
        case 5:
          this.sportHouse = true; 
          break;
        case 6:
          this.videogamesHouse = true;
          break;        
    } 
}

Player.prototype.wonHouse = function(type){ 
    switch(type)
    {
        case 1:
          return this.cookingHouse;
        case 2:
          return this.gardeningHouse;
        case 3:
          return this.moviesHouse;
        case 4:
          return this.musicHouse;
        case 5:
          return this.sportHouse; 
        case 6:
          return this.videogamesHouse;
    } 
}


Player.prototype.obtenirPoints = function(pointsComp, pointsCar){ 
    this.pointsComp = pointsComp;
    this.pointsCar = pointsCar;
}

Player.prototype.fuseeAutorisee = function(){ 
    return ( ( this.maisonCinema + this.maisonCuisine + this.maisonJardin + this.maisonJV + this.maisonMusique + this.maisonSport ) >= HowRetarded.getInstance().nbMaisons );
}

