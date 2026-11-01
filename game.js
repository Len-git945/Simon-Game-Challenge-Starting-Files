buttonColor=["red", "blue", "green", "yellow"];
gamePattern=[];

var started = false;
var level=0;

// GANTI KODE DI ATAS DENGAN KODE INI:


function startGame() {
    if (!started) {
        $("#level-title").text("Level " + level);
        started = true;
        nextSequence();
    }
}

// Desktop: tekan keyboard
$(document).on("keydown", function() {
    startGame();
});

// Mobile dan desktop: tap layar
$(document).on("pointerdown", function(event) {
    // Jangan mulai game jika yang disentuh tombol warna
    if ($(event.target).closest(".btn").length) {
        return;
    }

    startGame();
});



function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout (function(){
                nextSequence()},1000);
            }
        } else {
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
}



function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log ("gamePattern = "+gamePattern);
    $(".btn."+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
}

 function playSound(key){
    var sound= new Audio("./sounds/"+key+".mp3");
    sound.play();
}


$(".btn").click(function(){
     
     var userChosenColor= this.id; 
     userClickedPattern.push(userChosenColor);
     console.log("User Clicked Pattern = "+userClickedPattern);
     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
    }

function startOver(){
    level=0;
    gamePattern=[];    
    started=false;
}










