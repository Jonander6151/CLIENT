// document.addEventListener("DOMContentLoaded", load, false);

// function load(){
//     document
// }

document.addEventListener("DOMContentLoaded", () => {
    let savedData = localStorage.getItem("cines");
    let cines;

    if (!savedData) {
        cines = [
            ["MECHANIC:RESURRECTION", "IMG/mechanic.jpg", 100, 100],
            ["UN MONSTRUO VIENE A VERME", "IMG/unmonstruo.jpg", 150, 150],
            ["EL HOGAR DE MISS PEREGRINE PARA NIÑOS PECULIARES", "IMG/missperegrine.jpg", 75, 75],
            ["OZZY", "IMG/ozzy.jpg", 50, 50]
        ];
        localStorage.setItem("cines", JSON.stringify(cines));
    } else {
        cines = JSON.parse(savedData);
    }

    
    const defaultSynopsis = "Maecenas vitae eros nisi. Maecenas ipsum erat, auctor sed libero vitae, pulvinar porttitor leo. Aenean mattis sem sit amet tortor tincidunt cursus. Vivamus egestas cursus ipsum, sed tristique magna fermentum in. Pellentesque ac pretium ex. Phasellus convallis ante urna, sed laoreet lacus imperdiet a. Nulla ac nibh faucibus, tincidunt turpis vel, pretium elit.";

    let selectedScreenIndex = null;

    const todayFilmsDiv = document.getElementById("todayFilms");
    const elementsDiv = document.getElementById("elements");
    const divBuyTickets = document.getElementById("divBuyTickets") || document.getElementById("buyTickets");
    const screenHeading = document.getElementById("screen");
    const numTicketsInput = document.getElementById("numTickets");
    const ticketTypeSelect = document.getElementById("ticketType");
    const priceInput = document.getElementById("price");
    const totalInput = document.getElementById("total");
    const btnBuy = document.getElementById("btnBuy");

    function renderFilms() {
        todayFilmsDiv.innerHTML = "";
        cines.forEach((film, index) => {
            const filmCard = document.createElement("div");
            filmCard.className = "imageFilm";

            filmCard.innerHTML = `
                <p>SCREEN ${index + 1}</p>
                <img src="${film[1]}" alt="${film[0]}">
            `;

            filmCard.addEventListener("click", () => showMovieDetails(index));
            todayFilmsDiv.appendChild(filmCard);
        });
    }

    function showMovieDetails(index) {
        selectedScreenIndex = index;
        const film = cines[index];

 
        elementsDiv.innerHTML = `
            <div class="text">
                <h3>${film[0]}</h3>
                <p>${defaultSynopsis}</p>
            </div>
        `;


        updateScreenHeading();


        if (divBuyTickets) {
            divBuyTickets.style.display = "block";
        }

 
        numTicketsInput.value = "";
        calculatePrices();
    }

    function updateScreenHeading() {
        if (selectedScreenIndex === null) return;
        const film = cines[selectedScreenIndex];
        const screenNumber = selectedScreenIndex + 1;
        
        screenHeading.innerHTML = `NEXT SESSION SCREEN ${screenNumber}<br>TOTAL SEATS SCREEN:${film[2]} FREE SEATS:${film[3]}`;
    }

    function calculatePrices() {
        const ticketPrice = parseFloat(ticketTypeSelect.value) || 8;
        priceInput.value = ticketPrice;

        const quantityText = numTicketsInput.value;
        if (quantityText.trim() === "" || isNaN(quantityText)) {
            totalInput.value = "0";
            return;
        }

        const quantity = parseInt(quantityText, 10);
        totalInput.value = quantity * ticketPrice;
    }


    numTicketsInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
        calculatePrices();
    });


    ticketTypeSelect.addEventListener("change", calculatePrices);


    btnBuy.addEventListener("click", () => {
        if (selectedScreenIndex === null) return;

        const ticketsRequested = parseInt(numTicketsInput.value, 10);

        if (isNaN(ticketsRequested) || ticketsRequested <= 0) {
            alert("Please enter a valid number of tickets.");
            return;
        }

        const availableSeats = cines[selectedScreenIndex][3];

        if (ticketsRequested > availableSeats) {
            alert("We are sorry. There are not enough free seats");
            return;
        }


        cines[selectedScreenIndex][3] -= ticketsRequested;
        localStorage.setItem("cines", JSON.stringify(cines));

   
        updateScreenHeading();
        numTicketsInput.value = "";
        calculatePrices();
    });

    renderFilms();
    calculatePrices();
});