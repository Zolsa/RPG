
/*Need a reset that updates game.gameState and a way to update the HP displayed on each character.  
I can't figure out why this isn't working when it resets.
Tried everything I could think of.*/
var game = {};
var wins = 0;
var losses = 0;

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

        if(characters[i].id === $("#fightContainer > .game_card").attr("id")) { 
            return characters[i];
        }
    }
}

game.win = function() {
    alert("Congratulations. You Won!");
    wins++;
    $("#wins").text(wins);
    //Not sure why I have to call the reset function twice to reset all the characters.  If I just call it once, it doesn't reset the user and enemy.
    game.reset();
    game.reset();
}

game.lose = function() {
    alert("You Lost Try Again");
    losses++;
    $("#losses").text(losses);
    //Not sure why I have to call the reset function twice to reset all the characters.  If I just call it once, it doesn't reset the user and enemy.
    game.reset();
    game.reset();
    
}

game.gameUpdate = function() {
    
    if(game.gameState() === "fight") {

        if(game.userChar().hp <= 0) {
            $("#cardContainer > div").remove();
            game.lose();
        }

        else if(game.enemyChar().hp <= 0 && $("#enemyContainer > div").length === 0) {
            game.win();
        }

        else if(game.enemyChar().hp <= 0 && $("#enemyContainer > div").length >= 1) {
            $("#fightContainer > div").remove();
            $("h2").text("Choose Another Enemy");
        }

        else {
            return;
        }
    }

    else {
        return;
    }
}

game.updateChar = function () {
    /*Beginning of failed attempt to update the HP on each character.
    cardhP = document.getElementById(game.userChar().id + "-h5");*/
    game.userChar().hp = game.userChar().hp - game.enemyChar().attack;
    game.enemyChar().hp = game.enemyChar().hp - game.userChar().attack;
    game.userChar().attack += 5;
    $("#currenthp").text(game.userChar().hp); 
    $("#opponentshp").text(game.enemyChar().hp);
    console.log(game.userChar().hp);

}

//Reset works but throws back undefined for game.gameState which is why you can't keep playing
game.reset = function() {
    $(".game_card").remove();
    $("#fightButton").remove();
    $("h2").text("Choose Your Character");
    game.buildCards();
    game.bindCardListeners();
    game.createFightButton();
    $("#currenthp").text(0); 
    $("#opponentshp").text(0);

    for(i = 0; i < characters.length; i++) {
        characters[i].attack = game.randomInt(10, 20);
        characters[i].hp = game.randomInt(60, 100);
        console.log(i);
        console.log(characters[i].hp);
    }
    console.log(game.gameState());  
}

game.createFightButton = function() {
    $("#fightContainer").prepend("<button id=fightButton><h4>Fight!</h4></button>").trigger("create");
    $("#fightButton").bind("click", function() {
        switch(game.gameState()) {
            case "fight":
                game.enemyChar();
                game.updateChar();
                game.gameUpdate();
                /*According to the log the gameState is where it should be when it resets.  Just can't figure out why its not working.
                console.log($("#cardContainer > div").length);
                console.log($("#enemyContainer > div").length);
                console.log($("#fightContainer > div").length);*/
                break;

            case "char":
                alert("Please Choose Your Character");
                break;

            case "enemy":
                alert("Please Choose Your Enemy");
                break;

            case "lose":
                game.lose();

            case "win":
                game.win();          
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



