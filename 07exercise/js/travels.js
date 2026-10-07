const STORAGE_KEY = 'travelsData';
let travels = [];
let editingIndex = null;
let currentBase64Image = '';

const section = document.getElementById('section');
const navLinks = document.querySelectorAll('nav a');
const formContainer = document.getElementById('formContinents');
const createTravelBtn = document.getElementById('createTravel');

const cityInput = document.getElementById('city');
const countryInput = document.getElementById('country');
const fileChooser = document.getElementById('file-chooser');
const previewImage = document.getElementById('previewImage');
const continentSelect = document.getElementById('continent');
const priceInput = document.getElementById('price');
const saveBtn = document.getElementById('save');
const cancelBtn = document.getElementById('cancel');

document.addEventListener('DOMContentLoaded', () => {
    formContainer.style.display = 'none';
    section.style.display = 'grid';
    
    loadTravels();
    setupEventListeners();
});

function loadTravels() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        travels = JSON.parse(data);
    } else {
        travels = [];
    }
    renderTravels('ALL');
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(travels));
}

function renderTravels(filter = 'ALL') {
    section.innerHTML = '';

    const filteredTravels = (filter === 'ALL')
        ? travels
        : travels.filter(t => t.continent.toUpperCase() === filter.toUpperCase());

    filteredTravels.forEach((travel) => {
        const realIndex = travels.indexOf(travel);

        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <img src="${travel.image || ''}" alt="${travel.city}">
            <h3>${travel.city}</h3>
            <p><strong>País:</strong> ${travel.country}</p>
            <p><strong>Continente:</strong> ${travel.continent}</p>
            <p><strong>Precio:</strong> ${travel.price} €</p>
            <button class="btnEdit">Edit</button>
            <button class="btnDelete">Delete</button>
        `;

        const btnEdit = card.querySelector('.btnEdit');
        const btnDelete = card.querySelector('.btnDelete');

        btnEdit.addEventListener('click', () => openEditForm(realIndex));
        btnDelete.addEventListener('click', () => deleteTravel(realIndex));

        section.appendChild(card);
    });
}

function setupEventListeners() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const text = link.textContent.trim().toUpperCase();

            if (link.id === 'createTravel') {
                openCreateForm();
            } else {
                closeForm();
                renderTravels(text);
            }
        });
    });

    fileChooser.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (evt) {
                currentBase64Image = evt.target.result;
                previewImage.innerHTML = `<img src="${currentBase64Image}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });

    saveBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        const country = countryInput.value.trim();
        const continent = continentSelect.value;
        const price = priceInput.value.trim();

        if (!city || !country || !price) {
            alert('Please, fill all the remaining spaces!');
            return;
        }

        const travelData = {
            city,
            country,
            continent,
            price,
            image: currentBase64Image
        };

        if (editingIndex !== null) {
            travels[editingIndex] = travelData;
        } else {
            travels.push(travelData);
        }

        saveToStorage();
        closeForm();
        renderTravels('ALL');
    });

    cancelBtn.addEventListener('click', () => {
        closeForm();
    });
}

function openCreateForm() {
    resetForm();
    editingIndex = null;
    section.style.display = 'none';
    formContainer.style.display = 'block';
}

function openEditForm(index) {
    const travel = travels[index];
    if (!travel) return;

    editingIndex = index;
    cityInput.value = travel.city;
    countryInput.value = travel.country;
    continentSelect.value = travel.continent;
    priceInput.value = travel.price;

    currentBase64Image = travel.image || '';
    if (currentBase64Image) {
        previewImage.innerHTML = `<img src="${currentBase64Image}" alt="Preview">`;
    } else {
        previewImage.innerHTML = '';
    }

    section.style.display = 'none';
    formContainer.style.display = 'block';
}

function deleteTravel(index) {
    const confirmDelete = confirm('¿Are you sure you want to delete this travel?');
    if (confirmDelete) {
        travels.splice(index, 1);
        saveToStorage();
        renderTravels('ALL');
    }
}

function closeForm() {
    formContainer.style.display = 'none';
    section.style.display = 'grid';
    resetForm();
}

function resetForm() {
    cityInput.value = '';
    countryInput.value = '';
    fileChooser.value = '';
    previewImage.innerHTML = '';
    continentSelect.value = 'Africa';
    priceInput.value = '';
    currentBase64Image = '';
}