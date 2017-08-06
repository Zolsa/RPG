

var characters = [
        {
            "id" : "joeyBatts",
            "name" : "Joey Batts",
            "image" : "images/joey_batts.jpg",
            "attack" : 8,
            "defense" : 4,
            "onClick" : "reply_click(this.id)"
        },
        {
            "id" : "batman",
            "name" : "Batman",
            "image" : "images/batman.jpg",
            "attack" : 6,
            "defense" : 7
        },
        {
            "id" : "joker",
            "name" : "Joker",
            "image" : "images/joker.jpg",
            "attack" : 5,
            "defense" : 2
        },
        {
            "id" : "wolverine",
            "name" : "Wolverine",
            "image" : "images/wolverine.jpg",
            "attack" : 7,
            "defense" : 10
        },
    ],
    cards = [];





function buildCards () {
    
    var cardContainer = document.getElementById("cardContainer");

	for (var i = 0; i < characters.length; i++) {
        var card = document.createElement("div"),
            title = document.createElement("h4"),
            picture = document.createElement("img");

        // Set attributes
        card.setAttribute("id", characters[i].id);
        card.setAttribute("class", "game_card");
        picture.setAttribute("src", characters[i].image);
        picture.setAttribute("alt", characters[i].name);

        // Fill elements
        title.innerHTML = characters[i].name;
        card.appendChild(title);
        card.appendChild(picture);

        cardContainer.appendChild(card);
        cards.push(card);
        

    }
    
}


    

//function clickedChar ()

function bindCardListeners () {
    cards.forEach(function (card) {
        card.addEventListener("click", function () {
            //gameState1
            if(($("#cardContainer > div").length) !== 1)  {
    //function move1() {
                for(i = 0; i < cards.length; i++) {
                    if(cards[i].id !== card.id) {
                        $("#enemyContainer").append(cards[i]);     
                    }  
                }
                
                $("h2").text("Choose Enemy");
    
            }

            else if(($("#enemyContainer > div").length) >= 3 )   {
                $("#fightContainer").append(card);
                //var fB = $("<button>Fight!</button>");
                //$("#fightButton").after();

                

                //Create fight Button
                $("#fightContainer").prepend('<button data-role="button"><h4>Fight!</h4></button>').trigger('create');
                $("h2").text("Fight!");
    

            }

            else {

                    
                
                alert("Please Make an Appropriate Selection");
                return;
            }

            //fight algorithm
            $("button").click(function() {
                var userChar = $(".game_card").find("#gameContainer");
                console.log(userChar);
            })
            
    

            
                
            
           
                    
            
            console.log($("#cardContainer > div").length);
            //move();
            console.log("Clicked the " + card.id + " card");
            
            // check for state of game here and act accordingly

        });
    });
}



$(document).ready(function () {
    buildCards();
    console.log($("#cardContainer > div").length);
    bindCardListeners();
    

});


