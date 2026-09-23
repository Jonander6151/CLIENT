document.querySelector(".start-btn").addEventListener("click", startGame);
var gameScreen = document.querySelector(".screen.game-screen");
var startScreen = document.querySelector(".screen.start-screen");
var inputNumber = document.querySelector("input");
var message = document.querySelector(".message");
var buttonGuess = document.querySelector(".guess-btn").addEventListener("click",checkNumber);
var errors = document.querySelectorAll(".life");
let trys = 0;
let randomNum = Math.floor(Math.random() * 101);

function startGame(){
    startScreen.style.zIndex = "-1";
    console.log(randomNum);
}

function checkNumber(){
    if(trys!=5){
        if(randomNum==inputNumber.value){
            message.classList.add("win");
            message.textContent = "You have already win the game!";
        }else{
            errors[trys].classList.add("lost");
            trys++;
        }
        if(trys==5){
            message.classList.add("lose");
            message.textContent = "You have lost the game!";
        }else if(randomNum>inputNumber.value){
            message.textContent = "The number is higer!";
        }else{
            message.textContent = "The number is lower!";
        }
    }
}