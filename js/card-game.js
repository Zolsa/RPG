
//Need a win and loss function?  And adjust HP, wins and losses accordingly.  
var game = {};
var wins;
var losses;
var winsEl = document.getElementById('wins');
var lossesEl = document.getElementById('losses');
//Its better to create the HTML from here so its easier to make changes (add characters, properties etc.) if I want to.  More dynamic this way.
var characters = [
        {
            "id" : "joeyBatts",
            "name" : "Joey Batts",
            "image" : "images/joey_batts.jpg",
            "attack" : 8,
            "hp" : 60
            
        },
        {
            "id" : "batman",
            "name" : "Batman",
            "image" : "images/batman.jpg",
            "attack" : 12,
            "hp" : 120
        },
        {
            "id" : "joker",
            "name" : "Joker",
            "image" : "images/joker.jpg",
            "attack" : 18,
            "hp" : 100
        },
        {
            "id" : "wolverine",
            "name" : "Wolverine",
            "image" : "images/wolverine.jpg",
            "attack" : 12,
            "hp" : 130
        }
    ],
    cards = [];

game.buildCards = function() {

	for (i = 0; i < characters.length; i++) {
        var card = document.createElement("div"),
            title = document.createElement("h4"),
            picture = document.createElement("img"),
            hP = document.createElement("h5");


        // Set attributes
        hP.setAttribute("id", characters[i].id + "-h5");
        card.setAttribute("id", characters[i].id);
        card.setAttribute("class", "game_card");
        picture.setAttribute("src", characters[i].image);
        picture.setAttribute("alt", characters[i].name);

        // Fill elements
        hP.innerHTML = characters[i].hp;
        title.innerHTML = characters[i].name;
        card.appendChild(title);
        card.appendChild(picture);
        card.appendChild(hP);

        cardContainer.appendChild(card);
        cards.push(card);
    }    
}

game.gameState = function() {

    if($("#cardContainer > div").length === cards.length) {
        return "char";
    }

    else if($("#fightContainer > div").length === 0 && $("#enemyContainer > div").length >= 1 && $("#cardContainer > div").length === 1) {
        return "enemy";
    }

    else if($("#fightContainer > div").length === 1 && $("#enemyContainer > div").length >= 1 && $("#cardContainer > div").length === 1) {
        return "fight";
    }

    else if($("#fightContainer > div").length === 0 && $("#enemyContainer > div").length >= 0 && $("#cardContainer > div").length === 1) {
        return "win";
    }

    else if($("#cardContainer > div").length === 0) {
        return "lose";
    }

    else {
        return;
    }
}

game.userChar = function() {   
    for(i = 0; i < characters.length; i++) {
        if(characters[i].id === $("#cardContainer > .game_card").attr("id")) { 
            return characters[i];          
        }
    }   
}

game.enemyChar = function() {
    for(i = 0; i < characters.length; i++) {
        if(characters[i].id === ($("#fightContainer > .game_card").attr("id"))) { 
            return characters[i];
        }
    }
}

game.fight = function() {
    game.updateChar();       
    console.log(game.userChar().attack);
    console.log(game.userChar().hp);
    console.log(game.enemyChar().hp);   
}

game.updateChar = function () {
    //cardhP = document.getElementById(game.userChar().id + "-h5");
    game.userChar().hp = game.userChar().hp - game.enemyChar().attack;
    game.enemyChar().hp = game.userChar().hp - game.userChar().attack;
    game.userChar().attack += 5;
}
     
game.bindCardListeners = function() {
    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            switch(game.gameState()) {
                case "fight":
                    alert("Please Click Fight!");                
                    break;

                case "char":
                    $("h2").text("Choose Enemy");
                    for(i = 0; i < cards.length; i++) {
                        if(cards[i].id !== card.id) {
                            $("#enemyContainer").append(cards[i]);     
                        }  
                    }
                    break;

                case "enemy":
                    $("h2").text("Fight");
                    $("#fightContainer").append(card);
                    break;     
            }
            /*
            Switch statement was a little cleaner I think but this works too.

            if(game.gameState() === "fight") {
                alert("Please Click Fight!");
            //Don't know what to put here but it feels like it should be here.
            //Maybe if you click on anything but the button you get a "please click fight" alert.   
            }

            else if (game.gameState() === "char") {
                $("h2").text("Choose Enemy");
                for(i = 0; i < cards.length; i++) {
                    if(cards[i].id !== card.id) {
                        $("#enemyContainer").append(cards[i]);     
                    }  
                } 
            }

            else if(game.gameState() === "enemy") {
                $("h2").text("Fight");
                $("#fightContainer").append(card);
                $("h2").text("Fight");
                $("#fightButton").append('<button data-role="button"><h4>Fight!</h4></button>').trigger('create');
                $("button").bind("click", function() {
                    game.enemyChar();
                    game.userChar(); 
                    game.fight();
                });   
            }
            */
            console.log("Clicked the " + card.id + " card");
        });
    });
    $("#fightButton").append('<button data-role="button"><h4>Fight!</h4></button>').trigger('create');
    $("button").bind("click", function() {
        game.enemyChar();
        game.userChar(); 
        game.fight();

        /*This Doesn't work
        switch(game.gameState()) {
            case "win":
                    alert("Congratulations. You Won!");
                    wins++;
                    break;

            case "lose":
                alert("Sorry. You Lost. Try Again!");
                losses++;
        }
        */
        //This almost works
        if(game.userChar().hp <= 0) {
            $("#cardContainer > div").remove();
            $("h2").text("You Lost! Try Again");
        }
        
        if(game.enemyChar().hp <= 0) {
            $("#fightContainer > div").remove();
            $("h2").text("Choose Another Enemy");
        }
    });  
}

$(document).ready(function() {   
    game.buildCards();
    game.bindCardListeners();  
});



