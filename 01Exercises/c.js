// Claves y variables globales
const STORAGE_KEY = 'travelsData';
let travels = [];
let editingIndex = null; // Guarda el índice cuando estamos editando un viaje
let currentBase64Image = '';

// Referencias a elementos del DOM (según tu travels.html)
const section = document.getElementById('section');
const navLinks = document.querySelectorAll('nav a');
const formContainer = document.getElementById('formContinents');
const createTravelBtn = document.getElementById('createTravel');

// Campos del formulario
const cityInput = document.getElementById('city');
const countryInput = document.getElementById('country');
const fileChooser = document.getElementById('file-chooser');
const previewImage = document.getElementById('previewImage');
const continentSelect = document.getElementById('continent');
const priceInput = document.getElementById('price');
const saveBtn = document.getElementById('save');
const cancelBtn = document.getElementById('cancel');

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Al arrancar, el formulario debe estar oculto
    formContainer.style.display = 'none';
    
    loadTravels();
    setupEventListeners();
});

// Cargar viajes guardados en localStorage
function loadTravels() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        travels = JSON.parse(data);
    } else {
        travels = [];
    }
    renderTravels('ALL');
}

// Guardar el array en localStorage
function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(travels));
}

// Renderizar/Pintar las tarjetas en <section id="section">
function renderTravels(filter = 'ALL') {
    section.innerHTML = '';

    const filteredTravels = (filter === 'ALL')
        ? travels
        : travels.filter(t => t.continent.toUpperCase() === filter.toUpperCase());

    filteredTravels.forEach((travel) => {
        // Buscamos el índice real dentro del array global para editar/eliminar correctamente
        const realIndex = travels.indexOf(travel);

        const card = document.createElement('div');
        card.className = 'card';

        // Estructura idéntica al comentario de tu travels.html
        card.innerHTML = `
            <img src="${travel.image || ''}" alt="${travel.city}">
            <h3>${travel.city}</h3>
            <p><strong>País:</strong> ${travel.country}</p>
            <p><strong>Continente:</strong> ${travel.continent}</p>
            <p><strong>Precio:</strong> ${travel.price} €</p>
            <button class="btnEdit">Edit</button>
            <button class="btnDelete">Delete</button>
        `;

        // Eventos para Edit y Delete
        const btnEdit = card.querySelector('.btnEdit');
        const btnDelete = card.querySelector('.btnDelete');

        btnEdit.addEventListener('click', () => openEditForm(realIndex));
        btnDelete.addEventListener('click', () => deleteTravel(realIndex));

        section.appendChild(card);
    });
}

// Configuración de escuchadores de eventos
function setupEventListeners() {
    // 1. Filtrado de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const text = link.textContent.trim().toUpperCase();

            if (link.id === 'createTravel') {
                openCreateForm();
            } else {
                formContainer.style.display = 'none';
                renderTravels(text);
            }
        });
    });

    // 2. Previsualizar imagen y convertir a Base64 con FileReader
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

    // 3. Botón Save (Crear o Modificar)
    saveBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        const country = countryInput.value.trim();
        const continent = continentSelect.value;
        const price = priceInput.value.trim();

        if (!city || !country || !price) {
            alert('Por favor, retransmite o completa todos los campos del formulario.');
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
            // Modificar existente
            travels[editingIndex] = travelData;
        } else {
            // Añadir nuevo
            travels.push(travelData);
        }

        saveToStorage();
        renderTravels('ALL');
        closeForm();
    });

    // 4. Botón Cancel
    cancelBtn.addEventListener('click', () => {
        closeForm();
    });
}

// Abrir formulario para Crear
function openCreateForm() {
    resetForm();
    editingIndex = null;
    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Abrir formulario para Editar
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

    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Eliminar viaje
function deleteTravel(index) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este viaje?');
    if (confirmDelete) {
        travels.splice(index, 1);
        saveToStorage();
        renderTravels('ALL');
    }
}

// Cerrar y limpiar formulario
function closeForm() {
    formContainer.style.display = 'none';
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