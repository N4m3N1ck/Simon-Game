btns = ["r", "g", "b", "y"];
var gameStarted = false;
var title = $("h1");
var sequence = [];
var score = 0;
var canInput = false;
if(document.cookie == ""){
    $(".highscore").text("highscore: 0");
}
else{
    $(".highscore").text("highscore: " + document.cookie);
}
function show(i){
    canInput = false;
    var beep = new Audio("audio/btn.wav");
    beep.play();
    var btn = $("."+btns[sequence[i]])
    btn.addClass("pressed");
    setTimeout(function(){
        btn.removeClass("pressed");
        if(i < sequence.length - 1){
            setTimeout(function(){
                show(i + 1);
            },300);
        }else{
            canInput = true;
            title.text("Input the sequence");
        }
    },500);
}
var currentButtonPress = 0;
var score = 0;
function buttonPress(btn){
    if (btn == btns[sequence[currentButtonPress]]){
        var beep = new Audio("audio/correct.mp3");
        beep.play();
        var btn = $("."+btn)
        btn.addClass("correct");
        setTimeout(function(){
            btn.removeClass("correct");
        },300);
        if(currentButtonPress < sequence.length - 1){
            currentButtonPress += 1;
        } else{
            score += 1;
            $(".score").text("level: " + score);
            currentButtonPress = 0;
            title.text("Memorize the sequence");
            setTimeout(nextLevel, 1000)
        }
    }else{ 
        var beep = new Audio("audio/incorrect.mp3");
        beep.play();
        if(score > document.cookie){
            document.cookie = "" + score;
            $(".highscore").text("highscore: " + document.cookie);
        }
        var btn = $("."+btn)
        btn.addClass("incorrect");
        setTimeout(function(){
            btn.removeClass("incorrect");
        },300);
        sequence = [];
        canInput = false;
        currentButtonPress = 0;
        title.text("Game over. Tap anywhere to play again");
        setTimeout(function(){
            gameStarted = false;
        },1);
        score = 0;
    }
}
function nextLevel(){
    var n = Math.floor(Math.random()*4);
    sequence.push(n);
    show(0);
}
function startGame(){
    gameStarted = true;
    nextLevel();
}
$(document).click(function(){
    if(!gameStarted){
        $(".score").text("level: " + score);
        title.text("Memorize the sequence");
        setTimeout(startGame,1000);
    }
});
$(".gameButton").click(function(event){
    if(canInput){
        
        buttonPress(event.target.classList[1]);
    }
})