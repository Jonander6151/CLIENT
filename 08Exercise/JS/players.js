const API_URL = 'http://localhost:3000/players';

document.addEventListener("DOMContentLoaded", getPlayers);
const playersTable = document.querySelector("#tableBody");
const btnSave = document.querySelector("#btnSave");
const inputName = document.querySelector("#name");
const inputPassWord = document.querySelector("#password");
const inputAge = document.querySelector("#age");
const inputCity = document.querySelector("#city");
const inputPoints = document.querySelector("#points");
const inputType = document.querySelector("#typePlayer");
const formulary = document.querySelector("#formPlayer");
let globalId = -1;

async function getPlayers() {
    try {
        const data = await fetch(API_URL);
        const playersData = await data.json();
        console.log(playersData);
        showPlayersTable(playersData);
    } catch (error) {
        console.error("ERROR: Unreachable data from players.");
    }
}

function showPlayersTable(playersData) {
    playersTable.innerHTML = '';
    playersData.forEach(element => {
        const row = document.createElement("tr");
        const tdActions = document.createElement("td");
        btnEdit = document.createElement("button");
        btnEdit.textContent = "EDIT";
        btnEdit.className = "btn-edit";
        btnEdit.addEventListener("click", () => { changePlayer(element.id) })
        btnDelete = document.createElement("button");
        btnDelete.textContent = "DELETE";
        btnDelete.className = "btn-delete";
        btnDelete.addEventListener("click", () => { deletePlayer(element.id) })

        row.innerHTML = `<td>${element.name}</td><td>${element.age}</td><td>${element.city}</td><td>${element.points}</td><td>${element.typePlayer}</td>`;
        tdActions.appendChild(btnEdit);
        tdActions.appendChild(btnDelete);
        row.appendChild(tdActions);
        playersTable.appendChild(row);
    });
}

async function deletePlayer(id) {
    if (confirm("Are you sure that you want to delete the player?")) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
            getPlayers();
        } catch (error) {
            console.log("ERROR: It's not posible to delete the player!");
        }
    }
}

async function changePlayer(id) {
    globalId = id;
    const data = await fetch(`${API_URL}/${id}`);
    const playerData = await data.json();
    console.log(playerData);
    inputName.value = `${playerData.name}`;
    inputPassWord.value = `${playerData.password}`;
    inputAge.value = `${playerData.age}`;
    inputCity.value = `${playerData.city}`;
    inputPoints.value = `${playerData.points}`;
    btnSave.textContent = "Editing";
}

formulary.addEventListener("submit", async (e) => {
    e.preventDefault();
    const playersData = {
        "id": globalId,
        "name": inputName.value,
        "password": inputPassWord.value,
        "age": inputAge.value,
        "city": inputCity.value,
        "points": inputPoints.value,
        "typePlayer": inputType.value
    }
    console.log(playersData);
    if (globalId != -1) {
        await fetch(`${API_URL}/${globalId}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: playersData.id,
                name: playersData.name,
                password: playersData.password,
                age: parseInt(playersData.age),
                city: playersData.city,
                points: parseInt(playersData.points),
                typePlayer: playersData.typePlayer
            })
        });
        globalId = -1;
    } else {
        await fetch(`${API_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(players)
        });
    }
})
// npx json-server@0.17.4 --watch db.json

