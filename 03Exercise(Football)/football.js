
const biz_botoia = document.querySelector("#biz");
const gipuz_botoia = document.querySelector("#gipuz");
const animazioa = document.querySelector("#titleh1");
const radioSize = document.getElementsByName("radio");
const paragraphs = document.getElementsByClassName("textp");
const image = document.querySelector("#imageTeam");
const ageInput = document.getElementById("inputAge");
const ratingInput = document.getElementById("inputRating");
const buttonContainer = document.getElementById("divButtons");
const sentence = document.getElementById("word");
const buttonFinisher = document.querySelector("input[name=btnSpell]");

gipuz_botoia.addEventListener("click",gipuzkoa);
biz_botoia.addEventListener("click",bizkaia);
image.addEventListener("mouseover", changeTeam1);
image.addEventListener("mouseout", changeTeam2);
ageInput.addEventListener("keypress", restrictionNumbers);
ratingInput.addEventListener("keypress", restrictionNumbers);
buttonFinisher.addEventListener("click", createButtons);

function bizkaia(){
    animazioa.innerText = "Aupa Athletic!";
    animazioa.style.color = "red";
}

function gipuzkoa(){
    animazioa.innerHTML = "Aupa Erreala!";
    animazioa.style.color = "blue";
}

radioSize.forEach((radio, index) => {
    radio.addEventListener("change", (e) =>{
        let value2 = e.target.value;
        for(i=0;i<paragraphs.length;i++){
            paragraphs[i].style.fontSize = value2 + "px";
        }
    }
)
});


function changeTeam1(){
image.src="IMG/athletic.png";
}
function changeTeam2(){
image.src="IMG/erreala.png";
}

function restrictionNumbers(e){
    console.log(e.key);
    if(!/^[0-9]$/.test(e.key)){
        console.log("Here");
        e.preventDefault();
    }
}

formSurvey.addEventListener("submit", function(e){
    const ageValue = ageInput.value;
    const ratingValue = ratingInput.value;
    if(isNaN(ageValue) || ageValue < 18 || ageValue > 80){
        alert("ERROR: You must enter an age between 18 and 80");
    }
    if(isNaN(ratingValue) || ratingValue < 0 || ratingValue > 9){
        alert("ERROR: You must enter a rate between 0 and 9");
    }
    e.preventDefault();
});

function createButtons(){
    if(null === (sentence.value) | (sentence.value) === undefined){
        alert("ERROR! You have not entered a word!");
    }
    const word = sentence.value;
    for(i=0;i<word.length;i++){
        letterButton = document.createElement('input');
        letterButton.type = "button";
        letterButton.value = word[i];
        buttonContainer.appendChild(letterButton)
    }

}

