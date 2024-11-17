// dice 1
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage1 = "dice" + randomNumber1 + ".png";
document.querySelector(".img1").setAttribute("src", "./images/" + randomDiceImage1);

// dice 2
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage2 = "dice" + randomNumber2 + ".png";
document.querySelector(".img2").setAttribute("src", "./images/" + randomDiceImage2);

if ( randomNumber1 > randomNumber2 ) {
    document.querySelector("h1").innerHTML = "🚩Player 1 Wins!";
}
else if ( randomNumber1 < randomNumber2 ) {
    document.querySelector("h1").innerHTML = "Player 2 Wins!🚩";
}
else {
    document.querySelector("h1").innerHTML = "Draw!";
}
