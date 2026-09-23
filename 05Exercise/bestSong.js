const songs = [
  {
    id: 1,
    title: "Blinding Lights",
    artist: "The Weeknd",
    cover: "images/The weekendBlindingLights.png",
     sound: "audio/The_Weeknd_BlindingLights.mp3",
    votes: 0
  },
  {
    id: 2,
    title: "Flowers",
    artist: "Miley Cyrus",
    cover: "images/Miley_Cyrus_Flowers.png",
     sound: "audio/Miley_Cyrus_Flowers.MP3",
    votes: 0
  },
  {
    id: 3,
    title: "Bad Habits",
    artist: "Ed Sheeran",
    cover:  "images/edSheeranBadHabits_.jpg",
    sound: "audio/Ed_Sheeran_ Bad_Habits.MP3",
    votes: 0
  },
  {
    id: 4,
    title: "Levitating",
    artist: "Dua Lipa",
    cover: "images/duaLipaLevitating.jpg",
     sound: "audio/Dua_Lipa_Levitating.MP3",
    votes: 0
  },
  {
    id: 5,
    title: "As It Was",
    artist: "Harry Styles",
    cover:  "images/As_It_was.png",
     sound: "audio/Harry_Styles_As_It_Was.MP3",
    votes: 0
  }
];

document.querySelector("#accessibilityButton").addEventListener("click", displayAccesibility);
var accesoryPanel = document.querySelector("#accessibilityPanel");
var isDisplayed = false;
function displayAccesibility(){
  if(!isDisplayed){
    console.log(accesoryPanel.style.display);
    accesoryPanel.style.display = "inline";
    isDisplayed=true;
  }else{
    accesoryPanel.style.display = "none";
    isDisplayed=false;
  }
}

  

