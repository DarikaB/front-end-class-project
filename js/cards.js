//API URL
let url = "https://akabab.github.io/superhero-api/api/all.json";
let cardsInfo = document.getElementById('cards');

window.onload = getApiJson();

//display cards for each superhero
function displayCards(data) {

    //loop through array with data and display each hero info to DOM
    data.forEach(element => {
        //create <div> element. Add all card info to this div element.
        let div = document.createElement('div');
        cardsInfo.appendChild(div);
        //create <img> element in DOM. Add image src and alt to img element 
        let img = document.createElement('img');
        img.src = element.images.sm;
        img.alt = element.name;
        div.appendChild(img);
        //create <h5> element. Add hero name and name styling to h5
        let name = document.createElement('h5');
        name.setAttribute('width', '160');
        name.className = 'heroName';
        div.appendChild(name);
        name.innerText = element.name;
        //create <p> element. Add hero's real name and styling to <p>
        let realName = document.createElement('p');
        realName.setAttribute('width', '160');
        div.appendChild(realName);

        //display the hero's fullname, if they have one
        if(element.biography.fullName === '') {
            realName.innerText = element.name;
        } else {
            realName.innerText = element.biography.fullName;
        }
    })
}

//get API data in JSON format
async function getApiJson() {
    let getApi = await fetch(url);

    if(getApi == undefined) {
        console.log('error');
    }

    let getJson = await getApi.json();

    if(getJson == undefined) {
        console.log('error');
    }

    //function call to display all cards using JSON data
    displayCards(getJson);

}