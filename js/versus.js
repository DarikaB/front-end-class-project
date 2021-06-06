// color array to be used for the bar chart
let backgroundColors = [
    'rgba(255, 85, 94, 0.8)',
    'rgba(255, 134, 80, 0.8)',
    'rgba(255, 233, 129, 0.8)',
    'rgba(139, 241, 139, 0.8)',
    'rgba(131, 178, 255, 0.8)',
    'rgba(155, 110, 243, 0.8)'
];

// color array to be used for the bar chart
let borderColors = [
    'rgba(255, 85, 94, 1)',
    'rgba(255, 134, 80, 1)',
    'rgba(255, 233, 129, 1)',
    'rgba(139, 241, 139, 1)',
    'rgba(131, 178, 255, 1)',
    'rgba(155, 110, 243, 1)'
];

//API url
let url = "https://akabab.github.io/superhero-api/api/all.json";

//catching elements in versus.html so content can be added to DOM
const form = document.querySelector('form');
const heroOneName = document.getElementById('heroOneName');
const heroTwoName = document.getElementById('heroTwoName');
const myChart1 = document.getElementById('myChart1');
const myChart2 = document.getElementById('myChart2');

//event listener is triggered when the user enters 'submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //calls the function to get JSON file from the API
    getApiJson();
})

//create charts using the stats of two superheroes
function createChart(stats1, stats2) {

    //create chart 1 with stats1 object
    let chart1 = new Chart(myChart1, {
        type: 'bar',
        data: {
            labels: Object.keys(stats1),
            datasets: [{
                data: Object.values(stats1),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            }
        }
    })

    //create second chart using stats2
    let chart2 = new Chart(myChart2, {
        type: 'bar',
        data: {
            labels: Object.keys(stats2),
            datasets: [{
                data: Object.values(stats2),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            }
        }
    })
}

//check if the superhero names exist in the API
function findHeroByName(data) {
    let found1 = false;
    let found2 = false;

    //iterates through each object to see if both hero names exist
    data.forEach(element => {
        if(heroOneName.value === element.name) {
            found1 = true;
        }

        if(heroTwoName.value === element.name) {
            found2 = true;
        }
    })

    //if both inputs exist, call function to display in DOM
    if(found1 === true &&  found2 === true) {
        addToDOM(data);
    } else {
        //if one of the inputs don't exist, display error message
        let error = document.createElement('p');
        error.setAttribute('color', 'red');
        heroOneInfo.appendChild(error);
        error.innerText = 'First input is not found. Please, try again.';
    }
}

//find the names and create cards
function addToDOM(data) {
    let stats1, stats2;
    
        //iterate through the array and find matching name again and then change DOM
        //first input/superhero #1
        data.forEach(element => {
            if(heroOneName.value === element.name) {
                //create name in h5 tag
                let name = document.createElement('h5');
                //append it as a child to an existing tag reserved for content
                heroOneInfo.appendChild(name);
                name.innerText = element.name;
                //create img tag in DOM
                let img = document.createElement('img');
                img.src = element.images.sm;
                //using the name of the hero as alternate text for accesibility
                img.alt = element.name;
                heroOneInfo.appendChild(img);
                //add p tag for the real name of the superhero
                let realName = document.createElement('p');
                heroOneInfo.appendChild(realName);
                //handling the case where some superheroes don't have real names
                if(element.biography.fullName === '') {
                    realName.innerText = 'REAL NAME: same'
                } else {
                    realName.innerText = 'REAL NAME: ' + element.biography.fullName;
                }
                //create p tag for the publisher of the superhero such as DC or Marvel
                let publisher = document.createElement('p');
                heroOneInfo.appendChild(publisher);
                publisher.innerText = 'PUBLISHER: ' + element.biography.publisher;
                //create p tag for alignment (if they are good or evil)
                let alignment = document.createElement('p');
                heroOneInfo.appendChild(alignment);
                alignment.innerText = 'ALIGNMENT: ' + element.biography.alignment;
                
                //create array for chart to use as data
                stats1 = element.powerstats;
            }
    
            //iterate through the array and find matching name again and then change DOM
            //second input/superhero #2
            if(heroTwoName.value === element.name) {
                //create name in h5 tag
                let name = document.createElement('h5');
                //append it as a child to an existing tag reserved for content
                heroTwoInfo.appendChild(name);
                name.innerText = element.name;
                //create img tag in DOM
                let img = document.createElement('img');
                img.src = element.images.sm;
                //using the name of the hero as alternate text for accesibility
                img.alt = element.name;
                heroTwoInfo.appendChild(img);
                //add p tag for the real name of the superhero
                let realName = document.createElement('p');
                heroTwoInfo.appendChild(realName);
                //handling the case where some superheroes don't have real names
                if(element.biography.fullName === '') {
                    realName.innerText = 'REAL NAME: same'
                } else {
                    realName.innerText = 'REAL NAME: ' + element.biography.fullName;
                }
                //create p tag for the publisher of the superhero such as DC or Marvel
                let publisher = document.createElement('p');
                heroTwoInfo.appendChild(publisher);
                publisher.innerText = 'PUBLISHER: ' + element.biography.publisher;

                //create p tag for alignment (if they are good or evil)
                let alignment = document.createElement('p');
                heroTwoInfo.appendChild(alignment);
                alignment.innerText = 'ALIGNMENT: ' + element.biography.alignment;

                //create array for chart to use as data
                stats2 = element.powerstats;
            } 
        })

        //pass the two objects with powerstats to a funtion for creating charts
        createChart(stats1, stats2);
}

//function to make calls to the API
async function getApiJson() {
    let getApi = await fetch(url);

    //if fetching data is not successful
    if(getApi == undefined) {
        console.log('error');
    }

    //convert data to json
    let getJson = await getApi.json();

    //if conversion is not successful
    if(getJson == undefined) {
        console.log('error');
    }

    //pass the JSON file to another function to be broken
    findHeroByName(getJson);
}