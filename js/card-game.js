

var game = {};
var players = {};
var cardContainer = document.getElementById("cardContainer");
var enemyContainer = document.getElementById("enemyContainer");
var fightContainer = document.getElementById("fightContainer");
var characters = [
        {
            "id" : "joeyBatts",
            "name" : "Joey Batts",
            "image" : "images/joey_batts.jpg",
            "attack" : 8,
            "hp" : 50
            
        },
        {
            "id" : "batman",
            "name" : "Batman",
            "image" : "images/batman.jpg",
            "attack" : 6,
            "hp" : 60
        },
        {
            "id" : "joker",
            "name" : "Joker",
            "image" : "images/joker.jpg",
            "attack" : 4,
            "hp" : 70
        },
        {
            "id" : "wolverine",
            "name" : "Wolverine",
            "image" : "images/wolverine.jpg",
            "attack" : 2,
            "hp" : 80
        },
    ],
    cards = [];





game.buildCards = function() {
    
    

	for (var i = 0; i < characters.length; i++) {
        var card = document.createElement("div"),
            title = document.createElement("h4"),
            picture = document.createElement("img"),
            hP = document.createElement("h5");

        // Set attributes
        card.setAttribute("id", characters[i].id);
        card.setAttribute("class", "game_card");
        picture.setAttribute("src", characters[i].image);
        picture.setAttribute("alt", characters[i].name);

        // Fill elements
        hP.innerHTML = characters[i].hp
        title.innerHTML = characters[i].name;
        card.appendChild(title);
        card.appendChild(picture);
        card.appendChild(hP);

        cardContainer.appendChild(card);
        cards.push(card);
        
    }
    
}



                
            


game.gameState = function() {
    if(($("#cardContainer > div").length) === cards.length) {
        return "beginning";// body...
    }
    else if(($("#fightContainer > div").length) === 0) {
        if()
        return "chooseEnemy";
    }
    else if((($("#fightContainer > div").length) === 1 && ($("#enemyContainer > div").length) <= 2)) {
        return "fight";
    }
    else {
        return "fight";
    }
    
}

game.fightValidate = function() {
    if((($("#cardContainer > div").length) === 1 && ($("#fightContainer > div").length) === 1)) {
        return true;
    }
    else {
        return;
    }
}

game.determineEnemyChar = function() {
    
    for(i = 0; i < characters.length; i++) {
        if(characters[i].id === ($("#fightContainer > .game_card").attr("id"))) { 
            var enemyChar = characters[i];
        }
    }
    
    return(enemyChar);
}

    
game.determineUserChar = function() {
    
    for(i = 0; i < characters.length; i++) {
        if(characters[i].id === $("#fightContainer > .game_card").attr("id")) { 
            var userChar = characters[i];
        }
    }
    return(userChar);
}
    
game.fight = function() {     
    console.log(game.determineUserChar().hp);
    console.log(game.determineEnemyChar().hp);
    (game.determineUserChar().hp) = (game.determineUserChar().hp) - (game.determineEnemyChar().attack);
    (game.determineEnemyChar().hp) = (game.determineEnemyChar().hp) - (game.determineUserChar().attack);
    (game.determineUserChar().attack) += 5;
    console.log(game.determineUserChar().attack);
    console.log(game.determineUserChar().hp);
    console.log(game.determineEnemyChar().hp); 
}
        
    
  


game.bindCardListeners = function() {
    cards.forEach(function (card) {

        card.addEventListener("click", function () {
            //game.fight();

            if(game.gameState() === "beginning") {
                for(i = 0; i < cards.length; i++) {
                    if(cards[i].id !== card.id) {
                        $("#enemyContainer").append(cards[i]);     
                    }  
                } 
                $("h2").text("Choose Enemy");
            }

            else if(game.gameState() === "chooseEnemy") {
                $("#fightButton").append('<button data-role="button"><h4>Fight!</h4></button>').trigger('create');
                $("button").bind("click", function() {
                    
                        game.determineEnemyChar();
                        game.determineUserChar();
                        game.fight();

                }); 
                $("#fightContainer").append(card);
                $("h2").text("Fight");  
            }

            else if(game.gameState() === "fight") {
                

            }
             
                
                    //alert("Please Click Fight!");
                
            
            

            
            console.log("Clicked the " + card.id + " card");
            //return;

            // check for state of game here and act accordingly

        });
    });

    
}



$(document).ready(function () {
    var userChar;
    var enemyChar;
    game.buildCards();
    game.bindCardListeners();
    
});



