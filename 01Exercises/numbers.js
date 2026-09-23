document.addEventListener('DOMContentLoaded', () => {})
//ESTE COMANDO HACE QUE PUEDAS PONER EL LINK AL JS AL INICIO DEL HTML Y QUE LO LEA TODO ANTES DE ENTRAR

// var numbers= "";

// for(var i=0;i<=50;i+=2){
//     numbers+=i;
//     console.log(numbers);
// }

// document.write(numbers);


// var numbers= "";

// for(var i=0;i<=50;i+=2){
//     numbers+=i+" ";
// }

// document.write(numbers);


// var count = 0;

// for (var i=2;i<=50;i+=2) {

//     document.write(i + " "); 
//     count++;


//     if (count==5) {
//         document.write("<br>");
//         count=0;
//     }
// }




//     var count = 0;
//     var final = "<table><tr>";
//         for (var i=2;i<=50;i+=2) {
//             final += "<td>"+ i + "</td>"; 
//             count++;
//     if (count==5) {
//         final += "</tr><tr>";
//         count=0;
//     }
// }
// final += "</tr></table>";
// document.querySelector(".table-container").innerHTML=final;



// document.querySelector("#btnNew").addEventListener("click",newTable);
// function newTable(){
//     var count = 0;
//     var first = document.getElementById("firstNumber").value;
//     var last = document.getElementById("lastNumber").value;
//     var row = document.getElementById("byRow").value;
//     var final = "<table><tr>";
//     console.log(first);
//         if(first%2!=0){
//             first= first - 1;
//         }
//         for (var i=first;i<=last;i+=2) {

//             final += "<td>"+ i + "</td>"; 
//             count++;
//     if (count==row) {
//         final += "</tr><tr>";
//         count=0;
//     }
// }
// final += "</tr></table>";
// document.querySelector(".table-container").innerHTML=final;
// }