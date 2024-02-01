
var randomcolor = ["red", "blue", "green", "yellow"];

var simonpattern = [];
var userclickpattern = [];


var started = false;
var game = 0;


/////////// changing  level 
$(document).keypress(function(){
    if(!started){
        $("#game-title").text("Level " + game);
        simonsequence();
        started = true;
    }
});


///////  user clicked finction 
$(".btn").click(function(){
    var userchosecolor = $(this).attr("id");
    userclickpattern.push(userchosecolor);

    playSound(userchosecolor);
    animatepress(userchosecolor);

    checkans(userclickpattern.length-1);
});


///////////////////correct answer and incorrect answer
function checkans(currentlevel){
    if(simonpattern[currentlevel] === userclickpattern[currentlevel]){
        console.log("success");
        if(userclickpattern.length === simonpattern.length){
            setTimeout(function (){
                simonsequence();
            }, 1000);
        }
    } else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);

        $("#game-title").text("game over press any key to start");
        startover();

    }

}




////////// color + random number sequence 
function simonsequence(){
    userclickpattern = [];
    game++;
    $("#game-title").text("Level" + game);


    var randomnumber = Math.floor(Math.random() * 4);
    var colornum = randomcolor[randomnumber];
    simonpattern.push(colornum);

    $("#" + colornum).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colornum);


}

///////////// audio for particular button 
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

///////////////// shade in and shade out for particular  button
function animatepress(currentcolor){
    $("#" + currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}



function startover(){
    game = 0;
    simonpattern =[];
    started = false;

}

