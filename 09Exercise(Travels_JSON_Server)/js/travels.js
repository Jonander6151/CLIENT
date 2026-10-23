const API_URL = 'http://localhost:3000/travels';
const IMG_URL = 'http://localhost:3000/images';

document.addEventListener("DOMContentLoaded", getTravels);
const formulary = document.querySelector('#formContinents');
const travelsSpace = document.querySelector('#section');
const sections = document.querySelectorAll('nav a');

let allTravels = [];
let allImages = [];

// LOADS ALL THE DATA 
async function getTravels() {
    try {
        const data = await fetch(API_URL);
        allTravels = await data.json();
        const dataI = await fetch(IMG_URL);
        allImages = await dataI.json();
        
        showAllData(allTravels, allImages);
        setupImageSelect();
    } catch(error) {
        console.error("An error has ocurred getting the data!", error);
    }
}
// SHOWS ALL THE DATA ON THE SCREEN
function showAllData(dataTravels, dataImages) {
    if (formulary) formulary.style.display = 'none'; 
    
    travelsSpace.className = "section";
    travelsSpace.innerHTML = '';
    
    dataTravels.forEach(element => {
        const travel = document.createElement("div");
        travel.className = "card";
    
        let image = element.fileImage === "" ? element.image : element.fileImage;

        travel.innerHTML = `
            <img src="${image}" alt="${element.city}">
            <h3>${element.city}</h3>
            <p><strong>País:</strong> ${element.country} </p>
            <p><strong>Continente:</strong> ${element.continent}</p>
            <p><strong>Precio:</strong> ${element.price} €</p>
            <button class="btnEdit">Edit</button>
            <button class="btnDelete">Delete</button>
        `;

        travel.querySelector(".btnEdit").addEventListener("click", () => editTravel(element));
        travel.querySelector(".btnDelete").addEventListener("click", () => deleteTravel(element.id));
        
        travelsSpace.appendChild(travel);
    });
}
// FILTERS EACH SECTION
sections.forEach((filter) => {
    filter.addEventListener("click", function(e) {
        e.preventDefault(); 
        const selectedContinent = e.target.textContent.trim();

        if (selectedContinent === "ALL" || selectedContinent === "") {
            showAllData(allTravels, allImages);
        } else {
            const filtered = allTravels.filter(t => t.continent.toLowerCase() === selectedContinent.toLowerCase());
            showAllData(filtered, allImages);
        }
    });
});
// DELETES THE SELCTED TRAVEL
async function deleteTravel(id) {
    if (confirm("Are you sure that you want to delete the travel?")) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            getTravels(); 
        } catch (error) {
            console.log("ERROR: It's not possible to delete the travel!");
        }
    }
}
// EDITS THE SELECTED TRAVEL
async function editTravel(travel) {
    if (formulary) {
        travelsSpace.innerHTML = '';
        formulary.style.display = 'block'; 
        if(document.querySelector("#inputCity")) document.querySelector("#inputCity").value = travel.city;
        if(document.querySelector("#inputCountry")) document.querySelector("#inputCountry").value = travel.country;
        if(document.querySelector("#inputContinent")) document.querySelector("#inputContinent").value = travel.continent;
        if(document.querySelector("#inputPrice")) document.querySelector("#inputPrice").value = travel.price;
        formulary.dataset.editId = travel.id; 
    }
}
// FUNCTIONS OF THE SELECTED IMAGE
function setupImageSelect() {
    const select = document.querySelector('#selectImages'); 
    const preview = document.querySelector("#previewImage");
    
    if (!select || !allImages.length) return;

    select.innerHTML = '<option value="">Select an image...</option>';

    allImages.forEach(img => {
        const option = document.createElement("option");
        option.value = img.imagen; 
        option.textContent = img.ciudad; 
        select.appendChild(option);
    });

    select.addEventListener("change", () => {
        const actualPath = select.value;
        if (preview) {
            preview.innerHTML = actualPath ? `<img src="${actualPath}" alt="Preview" style="max-width: 200px;">` : "";
        }
    });
}
