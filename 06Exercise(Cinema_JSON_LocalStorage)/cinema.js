document.addEventListener("DOMContentLoaded", () => {
    let savedData = localStorage.getItem("cines");
    let cinema;

    if (!savedData) {
        cinema = [
            ["MECHANIC:RESURRECTION", "IMG/mechanic.jpg", 100, 100],
            ["UN MONSTRUO VIENE A VERME", "IMG/unmonstruo.jpg", 150, 150],
            ["EL HOGAR DE MISS PEREGRINE PARA NIÑOS PECULIARES", "IMG/missperegrine.jpg", 75, 75],
            ["OZZY", "IMG/ozzy.jpg", 50, 50]
        ];
        localStorage.setItem("cines", JSON.stringify(cinema));
    } else {
        cinema = JSON.parse(savedData);
    }

    var todayFilms = document.querySelector("#todayFilms");
    var description = document.querySelector("#elements");
    var filmTickets = document.querySelector("#screen");
    var selectedTickets = document.querySelector("#numTickets");
    var ticketType = document.querySelector("#ticketType");
    var price = document.querySelector("#price");
    var total = document.querySelector("#total");
    var buyButton = document.querySelector("#btnBuy");
    
    price.value = 8;
    
    let selectedFilmIndex = null;

    showFilms();

    function showFilms() {
        todayFilms.innerHTML = "";
        cinema.forEach((film, index) => {
            let filmCard = document.createElement("div");
            filmCard.className = "imageFilm";
            filmCard.innerHTML = `<p>SCREEN ${index + 1}</p><img src='${film[1]}'>`;
            
            todayFilms.appendChild(filmCard);
            
            filmCard.addEventListener("click", () => {
                selectedFilmIndex = index;
                showDetails(index);
            });
        });
    }

    function showDetails(index) {
        var film = cinema[index];
        description.innerHTML = `<h3>${film[0]}</h3><p>Lorem ipsum dolor sit amet consectetur adipiscing elit, integer diam senectus mollis dis rhoncus quisque, condimentum ornare vel mattis egestas sociosqu. Cursus euismod hendrerit parturient tempor metus sagittis rutrum inceptos, taciti eu consequat suscipit egestas velit lacus ultricies, hac magnis aenean orci morbi risus cras. Lacinia posuere vulputate netus sapien fames tellus volutpat ultrices orci hac, odio porttitor luctus ultricies eu at enim eros sagittis.</p>`;
        filmTickets.innerHTML = `<p>NEXT SESSION SCREEN ${index + 1}</p><p>TOTAL SEATS SCREEN: ${film[2]} | FREE SEATS: ${film[3]}</p>`;
    }

    ticketType.addEventListener("change", (e) => {
        price.value = e.target.value;
        total.value = price.value * (selectedTickets.value || 0);
    });

    selectedTickets.addEventListener("input", () => {
        total.value = price.value * (selectedTickets.value || 0);
    });

    buyButton.addEventListener("click", () => {
        if (selectedFilmIndex === null) {
            alert("Please select a movie first.");
            return;
        }
        
        let numTicketsVal = parseInt(selectedTickets.value);
        if (isNaN(numTicketsVal) || numTicketsVal <= 0) {
            alert("Please enter a valid number of tickets.");
            return;
        }

        var film = cinema[selectedFilmIndex];
        
        if (film[3] < numTicketsVal) {
            alert("ERROR! You have requested more seats than the total available!");
        } else {
            film[3] -= numTicketsVal;
            localStorage.setItem("cines", JSON.stringify(cinema));
            alert("Purchase completed successfully!");
            showDetails(selectedFilmIndex);
        }
    });
});
