
//Need a win and loss function, reset and adjust HP, wins and losses accordingly.  
var game = {};
var wins = 0;
var losses = 0;
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

    else if($("#fightContainer > div").length === 1 && $("#enemyContainer > div").length >= 0 && $("#cardContainer > div").length === 1) {
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

game.randomInt = function (min, max) {
    if (typeof min === "number" && typeof max === "number") {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;

    } 
    else {
        return false;
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
    game.enemyChar().hp = game.enemyChar().hp - game.userChar().attack;
    game.userChar().attack += 5;
}

game.reset = function() {
    for(i = 0; i < characters.length; i++) {
        $(".game_card").remove();
    game.buildCards();
    game.bindCardListeners();
    characters[i].attack = game.randomInt(10, 20);
    characters[i].hp = game.randomInt(120, 180); 
    }
}

//Not quite right
game.gameUpdate = function() {
    if(game.gameState() === "fight") {

        if(game.userChar().hp <= 0) {
            $("#cardContainer > div").remove();
            $("h2").text("You Lost! Try Again");
            game.reset();
        }
      
        if(game.enemyChar().hp <= 0) {
            $("#fightContainer > div").remove();
            $("h2").text("Choose Another Enemy");
        }
    }
}

game.createFightButton = function() {
    $("#fightButton").append("<button><h4>Fight!</h4></button>").trigger("create");
    $("button").bind("click", function() {
        if(game.gameState() === "char") {
            alert("Please Choose Your Character");
        }

        else if(game.gameState() === "enemy") {
            alert("Please Choose Your Enemy");
        }

        else {
        game.enemyChar();
        game.userChar(); 
        game.fight();
        game.gameUpdate();
        }
    });
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
                    game.userChar();
                    break;

                case "enemy":
                    game.userChar();
                    if(game.userChar().id === card.id) {
                        alert("Please Choose Your Enemy");
                    }

                    else if (game.userChar().id != card.id) {
                        $("h2").text("Fight");
                        $("#fightContainer").append(card);
                    }

                    else {
                        return;
                    }
            }
            
            /*Switch statement was a little cleaner I think but this works too.

            if(game.gameState() === "fight") {
                alert("Please Click Fight!");  
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
}

switch(game.gameState()) {
    case "win":
        alert("Congratulations. You Won!");
        wins++;
        winsEl = wins;
        break;

    case "lose":
        alert("Sorry. You Lost. Try Again!");
        losses++;
        lossesEl = losses;
}

$(document).ready(function() {   
    game.buildCards();
    game.bindCardListeners();
    game.createFightButton(); 
});



