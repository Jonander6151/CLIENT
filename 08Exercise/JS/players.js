const API_URL = 'http://localhost:3000/players';

document.addEventListener("DOMContentLoaded", getPlayers);
const playersTable = document.querySelector("#tableBody");
const btnSave = document.querySelector('#btnSave');


async function getPlayers() {
    try{
        const data = await fetch(API_URL);
        const playersData = await data.json();
        console.log(playersData);
        showPlayersTable(playersData);
    }catch(error){
        console.error("ERROR: Unreachable data from players.");
    }
}

 function showPlayersTable(playersData){;
    playersData.forEach(element => {
        const row = document.createElement("tr");
        row.innerHTML=`<td>${element.name}</td><td>${element.age}</td><td>${element.city}</td><td>${element.points}</td><td>${element.typePlayer}</td><td><button id="btnEdit">EDIT</button><button id="btnDelete">DELETE</button></td>`;
        playersTable.appendChild(row);
        const btnEdit = document.querySelector('#btnEdit');
        const btnDelete = document.querySelector('#btnDelete');
        btnDelete.addEventListener("click", delete(element,));

    });
    }




