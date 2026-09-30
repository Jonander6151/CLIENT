document.addEventListener("DOMContentLoaded", () => {
    let savedData = localStorage.getItem("cines");
    let data;
    let cinema;

    if (!savedData) {
        data = [
            ["MECHANIC:RESURRECTION", "IMG/mechanic.jpg", 100, 100],
            ["UN MONSTRUO VIENE A VERME", "IMG/unmonstruo.jpg", 150, 150],
            ["EL HOGAR DE MISS PEREGRINE PARA NIÑOS PECULIARES", "IMG/missperegrine.jpg", 75, 75],
            ["OZZY", "IMG/ozzy.jpg", 50, 50]
        ];
        localStorage.setItem("cines", JSON.stringify(data));
    } else {
        cinema = JSON.parse(savedData);
        console.log(cinema);
    }

    var todayFilms = document.querySelector("#todayFilms");
    var description = document.querySelector("#elements");
    showFilms();
    function showFilms() {

        todayFilms.innerHTML = "";
        cinema.forEach((film, index) => {
            let filmCard = document.createElement("div");
            filmCard.className=".imageFilm";
            filmCard.innerHTML=`<p>SCREEN ${index+1}</p><img src='${film[1]}'>`;
            console.log(filmCard);
            todayFilms.appendChild(filmCard);
            filmCard.addEventListener("click", ()=> showDetails(index));
        })

    }

    function showDetails(){

    }
})