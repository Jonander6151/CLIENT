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
    var filmTickets = document.querySelector("#screen");
    var selectedTickets = document.querySelector("#numTickets");
    var ticketType = document.querySelector("#ticketType");
    var price = document.querySelector("#price");
    var total = document.querySelector("#total");
    var buyButton = document.querySelector("#btnBuy");
    price.value=8;
    showFilms();
    function showFilms() {

        todayFilms.innerHTML = "";
        cinema.forEach((film, index) => {
            let filmCard = document.createElement("div");
            filmCard.className="imageFilm";
            filmCard.innerHTML=`<p>SCREEN ${index+1}</p><img src='${film[1]}'>`;
            console.log(filmCard);
            todayFilms.appendChild(filmCard);
            filmCard.addEventListener("click", ()=> showDetails(index));
            buyButton.addEventListener("click",purchase(index));
        })
        
    }

    function showDetails(index){
        var film = cinema[index];
        description.innerHTML=`<h3>${film[0]}</h3><p>Lorem ipsum dolor sit amet consectetur adipiscing elit, integer diam senectus mollis dis rhoncus quisque, condimentum ornare vel mattis egestas sociosqu. Cursus euismod hendrerit parturient tempor metus sagittis rutrum inceptos, taciti eu consequat suscipit egestas velit lacus ultricies, hac magnis aenean orci morbi risus cras. Lacinia posuere vulputate netus sapien fames tellus volutpat ultrices orci hac, odio porttitor luctus ultricies eu at enim eros sagittis.</p>`;
        filmTickets.innerHTML=`<p>NEXT SESSION SCREEN ${index+1}</p><p>TOTAL SEATS SCREEN: ${film[2]} FREE SEATS: ${film[3]}`;
    }



    ticketType.addEventListener("click", (e)=>{
            price.value=e.target.value;
    });


    selectedTickets.addEventListener("keypress", (e)=>{
        if(!/^[0-9]$/.test(e.key)){
            e.preventDefault();
        }
        if((selectedTickets.value<0 || selectedTickets.value>150)){
            e.preventDefault();
        }
    });

    selectedTickets.addEventListener("keyup", (e)=>{        
        total.value=price.value*selectedTickets.value;       
    });

    function purchase(index){
        var film = cinema[index];
        if(film[3]<selectedTickets.value){
            alert("ERROR! You have requested more seats than the total available!");
        }else{
            film[3]-=selectedTickets.value;
            localStorage.setItem("cines", JSON.stringify(cinema));
        }
    }
    
})