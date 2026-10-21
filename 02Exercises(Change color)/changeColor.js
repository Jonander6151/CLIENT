
document.querySelector(".card").addEventListener("mouseover",increase);
document.querySelector(".card").addEventListener("mouseout",decrease);
document.querySelector("#boton").addEventListener("click",changecolor1);

document.querySelector(".card").style.transform = "scale(2)";
document.querySelector(".texto").textContent = "The mouse is out";

// function increase(){
//     document.querySelector(".card").style.transform = "scale(1)";
//     document.querySelector(".texto").textContent = "The mouse is over";
// }

// function decrease(){
//     document.querySelector(".card").style.transform = "scale(2)";
//     document.querySelector(".texto").textContent = "The mouse is out";
// }

function changecolor1(){
    document.querySelector("#fondo").style.backgroundColor = "green";
    document.querySelector("#boton").removeEventListener("click", changecolor1);
     document.querySelector("#boton").addEventListener("click",changecolor2);
 }

 function changecolor2(){
    document.querySelector("#fondo").style.backgroundColor = "blue";
    document.querySelector("#boton").removeEventListener("click", changecolor2);
     document.querySelector("#boton").addEventListener("click",changecolor1);
 }