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
    cover: "images/edSheeranBadHabits_.jpg",
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
    cover: "images/As_It_was.png",
    sound: "audio/Harry_Styles_As_It_Was.MP3",
    votes: 0
  }
];

document.querySelector("#accessibilityButton").addEventListener("click", displayAccesibility);
var formAccesibility = document.querySelector("#accessibilityForm");
var accesoryPanel = document.querySelector("#accessibilityPanel");
var isDisplayed = false;
var charSizes = document.querySelectorAll("input[name='fontSize']");
var theme = document.querySelector("#themeSelect");
var songCard = document.querySelector(".song-card");

/*ACCESIBILITY DISPLAY & FUNCTIONS*/
function displayAccesibility() {
  if (!isDisplayed) {
    accesoryPanel.style.display = "inline";
    isDisplayed = true;
  } else {
    accesoryPanel.style.display = "none";
    isDisplayed = false;
  }
  /*DARK/LIGHT MODES*/
  theme.addEventListener("click", (e) => {
    if (e.target.value == "dark") {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("dark-theme");

      console.log(theme.value);
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    }
    /*CHARACTER CHANGES*/
    charSizes.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        console.log(e.target.value);
        document.querySelector(".description").style.fontSize = e.target.value;
      });
    });
  })
}
for(let i=0;i<4;i++){
  var cloneCard = songCard.cloneNode(true);
  document.querySelector("#songsContainer").appendChild(cloneCard);
  cloneCard.querySelector("img").src = songs[i].cover;
  cloneCard.querySelector("h2").textContent = songs[i].title;
  cloneCard.querySelector("p").textContent = songs[i].artist;
}

var songCards = document.querySelectorAll(".song-card");


musicButtons = document.querySelectorAll(".play-button");

