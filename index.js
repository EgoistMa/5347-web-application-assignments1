// listening to searches
document.getElementById("search-input").addEventListener("input", processSearch);

characterList = []; // character list container

function processSearch(event) {
    var searchValue = event.target.value;
    console.log(searchValue);
    search(searchValue);
}

function getJsonObject(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function search(searchValue) {
    // TODO: search JSON data for the searchValue
}

function loadCharacters() {
    var table = document.getElementById("character-table");

    characterList.forEach(function (character) {
        console.log(character, "loadCharacters")
        var row = table.insertRow(-1);

        var nameCell = row.insertCell(0);
        nameCell.innerHTML = character.name;

        var cell2 = row.insertCell(1);
        cell2.innerHTML = character.strength;

        var cell3 = row.insertCell(2);
        cell3.innerHTML = character.speed;

        var cell4 = row.insertCell(3);
        cell4.innerHTML = character.skill;

        var cell5 = row.insertCell(4);
        cell5.innerHTML = character.fear_factor;

        var cell6 = row.insertCell(5);
        cell6.innerHTML = character.power;

        var cell7 = row.insertCell(6);
        cell7.innerHTML = character.intelligence;

        var cell8 = row.insertCell(7);
        cell8.innerHTML = character.wealth;

        var cell9 = row.insertCell(8);

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = character.selected;
        cell9.appendChild(checkbox);
    });
}

window.onload = function () {
    getJsonObject('data.json',
        function (data) {
            characterList = data.Characters; // store the character list into characterList
            console.log(characterList); // print it into console (developer tools)
            console.log(characterList[0]); // print the first character object to the console
            // here you can call methods to load or refresh the page
            loadCharacters() //or refreshPage()
        },
        function (xhr) {
            console.error(xhr);
        }
    );
    slideLeft();
    slideRight();
}

let sliderOne = document.getElementById("sliderLeft");
let sliderTwo = document.getElementById("sliderRight");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("sliderLeft").max;

function slideLeft(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideRight(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #000 ${percent1}% , #000 ${percent2}%, #dadae5 ${percent2}%)`;
}