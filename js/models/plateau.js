var cases = new Array ( 
	new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
	new Array (0,0,0,7,1,1,0,0,0,0,0,5,1,1,1,1,0,0,0,0,0),
	new Array (0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0),
	new Array (0,0,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,3,0,0,0),
	new Array (0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0),
	new Array (0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0),
	new Array (0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0),
	new Array (0,1,1,1,1,1,1,1,0,1,0,0,0,9,1,1,0,1,1,1,0),
	new Array (0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0),
	new Array (0,8,0,0,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0),
	new Array (0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0),
	new Array (0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0),
	new Array (0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0),
	new Array (0,0,0,0,0,1,1,1,1,6,0,0,0,1,1,1,0,1,1,1,0),
	new Array (0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0),
	new Array (0,0,0,2,1,1,1,1,0,0,0,0,0,4,1,1,1,1,0,0,0),
	new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
);
//0 = mur
//1 = sol
//2 = Depart
//3 = arrivee
//4 = cooking
//5 = gardenning
//6 = movies
//7 = music	
//8 = sports
//9 = videogames


function getCaseType(x, y){
	return cases[y][x];
}



function setQuestionByType(questions, type) {  
    var typedQuestions = new Array;

    for (var i=0; i<questions.length; ++i){
        if (questions[i].type == type)
            typedQuestions.push(questions[i]);
    }

    var random = Math.floor(Math.random()*typedQuestions.length);
    return typedQuestions[random];
}

function getNameType(type) {
    switch(type)
    {
        case 1:
          return "cooking";
        case 2:
          return "gardening";
        case 3:
          return "movies";
        case 4:
          return "music";
        case 5:
          return "sport"; 
        case 6:
          return "videogames";
    } 
}



