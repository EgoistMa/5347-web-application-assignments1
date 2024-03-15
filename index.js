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

        //create div element
        var checkboxDiv = document.createElement('div');
        checkboxDiv.name = "checkboxCustom" + character.name;
        
        //create input element
        var checkboxInput = document.createElement('input');
        checkboxInput.type = "checkbox";
        checkboxInput.id = "checkboxCustom" + character.name;
        checkboxInput.checked = false;
        checkboxInput.className = "checkbox-custom";

        //create label element
        var checkboxLabel = document.createElement('label');
        checkboxLabel.htmlFor = "checkboxCustom" + character.name;

        //add two elements into the div
        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(checkboxLabel);

        cell9.appendChild(checkboxDiv);
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
    var filters = ['strength', 'speed', 'skill', 'fear-factor', 'power', 'intelligence', 'wealth'];
    filters.forEach(function (filterName) {
        initializeSlider(filterName+"-inputLeft", filterName+"-inputRight", filterName+"-rangeLeft", filterName+"-rangeRight", filterName+"-slider-track", slideLeftOnchange, slideRightOnchange);
    });
    // initializeSlider("strength-inputLeft", "strength-inputRight", "strength-rangeLeft", "strength-rangeRight", "strength-slider-track", slideLeftOnchange, slideRightOnchange);
    // initializeSlider("speed-inputLeft", "speed-inputRight", "speed-rangeLeft", "speed-rangeRight", "speed-slider-track", slideLeftOnchange, slideRightOnchange);
}
window.onresize = function () {
    slideLeft();
    slideRight();
}
// //strength slider
// let sliderLeft = document.getElementById("strength-inputLeft");;
// let sliderRight = document.getElementById("strength-inputRight");
// let displayValLeft = document.getElementById("strength-rangeLeft");
// let displayValRight = document.getElementById("strength-rangeRight");
// let sliderTrack = document.getElementById("strength-slider-track");
// let minGap = 0;
// let sliderMaxValue = sliderLeft.max;
// sliderLeft.oninput = strengthSlideLeftOnchange;
// sliderRight.oninput = strengthSlideRightOnchange;
// //speed slider
// let sliderLeftSpeed = document.getElementById("speed-inputLeft");
// let sliderRightSpeed = document.getElementById("speed-inputRight");
// let displayValLeftSpeed = document.getElementById("speed-rangeLeft");
// let displayValRightSpeed = document.getElementById("speed-rangeRight");
// let sliderTrackSpeed = document.getElementById("speed-slider-track");
// let sliderMaxValueSpeed = sliderLeftSpeed.max;
// sliderLeftSpeed.oninput = speedSlideLeftOnchange;
// sliderRightSpeed.oninput = speedSlideRightOnchange;

// window.onload = function () {
//     console.log("window.onload");
//     strengthSlideLeftOnchange();
//     strengthSlideRightOnchange();
//     speedSlideLeftOnchange();
//     speedSlideRightOnchange();
// }
// function strengthSlideLeftOnchange(){
//     console.log("slideLeftOnchange");
//     if(parseInt(sliderRight.value) - parseInt(sliderLeft.value) <= minGap){
//         sliderLeft.value = parseInt(sliderRight.value) - minGap;
//     }
//     displayValLeft.textContent = sliderLeft.value;
//     displayValLeft.style.left = (sliderLeft.value / sliderMaxValue) * 80 + 6 +"%";
//     strengthFillColor();
// }
// function strengthSlideRightOnchange(){
//     console.log("slideRightOnchange");
//     if (parseInt(sliderRight.value) - parseInt(sliderLeft.value) <= minGap) {
//         sliderRight.value = parseInt(sliderLeft.value) + minGap;
//     }
//     displayValRight.textContent = sliderRight.value;
//     displayValRight.style.left = (sliderRight.value / sliderMaxValue) * 80 + 6 +"%";
//     strengthFillColor();
// }

// function strengthFillColor(){
//     percent1 = (sliderLeft.value / sliderMaxValue) * 100;
//     percent2 = (sliderRight.value / sliderMaxValue) * 100;
//     sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #000 ${percent1}% , #000 ${percent2}%, #dadae5 ${percent2}%)`;
// }

// //speed slider
// function speedSlideLeftOnchange(){
//     console.log("slideLeftOnchange");
//     if(parseInt(sliderRightSpeed.value) - parseInt(sliderLeftSpeed.value) <= minGap){
//         sliderLeftSpeed.value = parseInt(sliderRightSpeed.value) - minGap;
//     }
//     displayValLeftSpeed.textContent = sliderLeftSpeed.value;
//     displayValLeftSpeed.style.left = (sliderLeftSpeed.value / sliderMaxValueSpeed) * 80 + 6 +"%";
//     speedFillColor();
// }
// function speedSlideRightOnchange(){
//     console.log("slideRightOnchange");
//     if (parseInt(sliderRightSpeed.value) - parseInt(sliderLeftSpeed.value) <= minGap) {
//         sliderRightSpeed.value = parseInt(sliderLeftSpeed.value) + minGap;
//     }
//     displayValRightSpeed.textContent = sliderRightSpeed.value;
//     displayValRightSpeed.style.left = (sliderRightSpeed.value / sliderMaxValueSpeed) * 80 + 6 +"%";
//     speedFillColor();
// }
// function speedFillColor(){
//     percent1 = (sliderLeftSpeed.value / sliderMaxValueSpeed) * 100;
//     percent2 = (sliderRightSpeed.value / sliderMaxValue) * 100;
//     sliderTrackSpeed.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #000 ${percent1}% , #000 ${percent2}%, #dadae5 ${percent2}%)`;
// }
document.addEventListener('DOMContentLoaded', function () {
    var filters = ['strength', 'speed', 'skill', 'fear-Factor', 'power', 'intelligence', 'wealth'];
    var filterContainer = document.getElementById('injection');

    filters.forEach(function (filterName) {
        var filterDiv = document.createElement('div');
        filterDiv.className = 'filter';
        filterDiv.setAttribute('name', 'doubleSliderComponent');

        var label = document.createElement('p');
        label.className = 'filterLabel';
        label.textContent = filterName;

        var containerDiv = document.createElement('div');
        containerDiv.className = 'container';
        containerDiv.setAttribute('name', filterName.toLowerCase());

        var sliderTrackDiv = document.createElement('div');
        sliderTrackDiv.className = 'slider-track';
        sliderTrackDiv.setAttribute('name', filterName.toLowerCase());
        sliderTrackDiv.id = filterName.toLowerCase() + '-slider-track';

        var valuesDiv = document.createElement('div');
        valuesDiv.className = 'values';
        valuesDiv.setAttribute('name', filterName.toLowerCase());

        var rangeLeftP = document.createElement('p');
        rangeLeftP.className = 'rangeLeft';
        rangeLeftP.id = filterName.toLowerCase() + '-rangeLeft';
        rangeLeftP.textContent = '0';

        var rangeRightP = document.createElement('p');
        rangeRightP.className = 'rangeRight';
        rangeRightP.id = filterName.toLowerCase() + '-rangeRight';
        rangeRightP.textContent = '100';

        var inputLeft = document.createElement('input');
        inputLeft.type = 'range';
        inputLeft.min = '0';
        inputLeft.max = '100';
        inputLeft.value = '0';
        inputLeft.className = 'inputLeft';
        inputLeft.id = filterName.toLowerCase() + '-inputLeft';

        var inputRight = document.createElement('input');
        inputRight.type = 'range';
        inputRight.min = '0';
        inputRight.max = '100';
        inputRight.value = '100';
        inputRight.className = 'inputRight';
        inputRight.id = filterName.toLowerCase() + '-inputRight';

        valuesDiv.appendChild(rangeLeftP);
        valuesDiv.appendChild(rangeRightP);

        containerDiv.appendChild(sliderTrackDiv);
        containerDiv.appendChild(valuesDiv);
        containerDiv.appendChild(inputLeft);
        containerDiv.appendChild(inputRight);

        filterDiv.appendChild(label);
        filterDiv.appendChild(containerDiv);

        filterContainer.appendChild(filterDiv);
    });
});

function initializeSlider(sliderIdLeft, sliderIdRight, displayIdLeft, displayIdRight, trackId, onChangeLeft, onChangeRight) {
    //get elements
    let sliderLeft = document.getElementById(sliderIdLeft);
    let sliderRight = document.getElementById(sliderIdRight);
    let displayValLeft = document.getElementById(displayIdLeft);
    let displayValRight = document.getElementById(displayIdRight);
    let sliderTrack = document.getElementById(trackId);
    let minGap = 0;
    let sliderMaxValue = sliderLeft.max;

    //register the onValueChange event listeners
    sliderLeft.oninput = () => onChangeLeft(sliderLeft, sliderRight, displayValLeft, displayValRight, sliderTrack, minGap, sliderMaxValue);
    sliderRight.oninput = () => onChangeRight(sliderLeft, sliderRight, displayValLeft, displayValRight, sliderTrack, minGap, sliderMaxValue);
    
    //first rendering of the slider
    onChangeLeft(sliderLeft, sliderRight, displayValLeft, displayValRight, sliderTrack, minGap, sliderMaxValue);
    onChangeRight(sliderLeft, sliderRight, displayValLeft, displayValRight, sliderTrack, minGap, sliderMaxValue);
}
//onSlideLeftOnchange
function slideLeftOnchange(sliderLeft, sliderRight, displayValLeft, displayValRight, sliderTrack, minGap, sliderMaxValue) {
    if (parseInt(sliderRight.value) - parseInt(sliderLeft.value) <= minGap) {
        sliderLeft.value = parseInt(sliderRight.value) - minGap;
    }
    displayValLeft.textContent = sliderLeft.value;
    displayValLeft.style.left = (sliderLeft.value / sliderMaxValue) * 80 + 6 +"%";
    updateSliderFill(sliderLeft, sliderRight, sliderTrack, sliderMaxValue);
}
//onSlideRightOnchange
function slideRightOnchange(sliderLeft, sliderRight, displayValLeft, displayValRight, sliderTrack, minGap, sliderMaxValue) {
    if (parseInt(sliderRight.value) - parseInt(sliderLeft.value) <= minGap) {
        sliderRight.value = parseInt(sliderLeft.value) + minGap;
    }
    displayValRight.textContent = sliderRight.value;
    displayValRight.style.left = (sliderRight.value / sliderMaxValue) * 78 + 6 +"%";
    updateSliderFill(sliderLeft, sliderRight, sliderTrack, sliderMaxValue);
}
//render the slider background fill
function updateSliderFill(sliderLeft, sliderRight, sliderTrack, sliderMaxValue) {
    let percent1 = (sliderLeft.value / sliderMaxValue) * 100;
    let percent2 = (sliderRight.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #000 ${percent1}% , #000 ${percent2}%, #dadae5 ${percent2}%)`;
}

