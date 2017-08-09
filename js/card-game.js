
//Need a reset that updates game.gameState and a way to update the dom ids HP, wins and losses at every step.  
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

game.winLose = function() {
    switch(game.gameState()) {
        case "lose":
            alert("Sorry. You Lost. Try Again!");
            losses++;
            lossesEl = losses;
            break;
        case "win":
            alert("Congratulations. You Won!");
            wins++;
            winsEl = wins;
    }
}

game.gameUpdate = function() {
    
    if(game.gameState() === "fight") {

        if(game.enemyChar().hp <= 0) {
            $("#fightContainer > div").remove();
            $("h2").text("Choose Another Enemy");
        }
    }
    else if(game.gameState() === "win" || game.gameState() === "lose") {
        game.winLose();
    }
    else {
        return;
    }
}

game.updateChar = function () {
    //cardhP = document.getElementById(game.userChar().id + "-h5");
    game.userChar().hp = game.userChar().hp - game.enemyChar().attack;
    game.enemyChar().hp = game.enemyChar().hp - game.userChar().attack;
    game.userChar().attack += 5;
}

//reset isn't working quite right
game.reset = function() {
    $(".game_card").remove();
    $("#fightButton").remove();
    $("h2").text("Choose Your Character");
    game.buildCards();
    game.bindCardListeners();

    for(i = 0; i < characters.length; i++) {
        characters[i].attack = game.randomInt(10, 20);
        characters[i].hp = game.randomInt(60, 100);
    }
    //Can't seem to get the game.State
    
}

/*
Didn't need this in the end
game.createResetButton = function() {
    game.reset();
    $("#cardContainer").prepend("<button id=resetButton><h4>Reset</h4></button>").trigger("create");
    $("#resetButton").bind("click", function() {
        game.reset();
        //This doesn't work
        return game.gameState();
    });
}
*/

game.createFightButton = function() {
    $("#fightContainer").prepend("<button id=fightButton><h4>Fight!</h4></button>").trigger("create");
    $("#fightButton").bind("click", function() {
        switch(game.gameState()) {
            case "fight":
                game.enemyChar();
                game.updateChar();
                game.gameUpdate();
                break;

            case "char":
                alert("Please Choose Your Character");
                break;

            case "enemy":
                alert("Please Choose Your Enemy");
                break;

            case "lose":
                alert("Sorry. You Lost. Try Again!");
                losses++;
                lossesEl = losses;
                game.reset();
                game.reset();
                break;

            case "win":
                alert("Congratulations. You Won!");
                wins++;
                winsEl = wins;
                game.reset();
                game.reset(); 
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
                    
                    $("h2").text("Choose Your Enemy");
                    for(i = 0; i < cards.length; i++) {
                        if(cards[i].id !== card.id) {
                            $("#enemyContainer").append(cards[i]);     
                        }  
                    }
                    
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
                    break;

                case "win":
                    alert("Congratulations You Won!");
                    game.reset();
                    game.reset();
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



$(document).ready(function() {   
    game.buildCards();
    game.bindCardListeners();
    game.createFightButton();
});



