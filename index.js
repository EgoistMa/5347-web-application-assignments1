// listening to searches
document.getElementById("search-input").addEventListener("input", processSearch);

characterList = []; // character list container

function processSearch(event) {
    var searchValue = event.target.value;
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
document.getElementById('search-input').addEventListener('keypress', function(event) { //provent the form from submitting when the enter key is pressed
    if (event.key === "Enter") {
        event.preventDefault(); 
        reloadCharacters(); 
    }
});
let attributes = ['strength', 'speed', 'skill', 'fear_factor', 'power', 'intelligence', 'wealth'];
var clickedCharacter = [];
var filterValues= {};
let imagesrc = "data:image/png;base64,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";
let noimagesrc = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
function loadCharacters( renderCharacterList) {
    var table = document.getElementById("character-table");
    var tablebody = table.getElementsByTagName('tbody')[0];
    renderCharacterList.forEach(function (character) {
        console.log(character, "loadCharacters")
        var row = tablebody.insertRow(-1);

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
        checkboxInput.checked = clickedCharacter.includes(character);
        checkboxInput.className = "checkbox-custom";
        checkboxInput.onchange = function () {
            if (checkboxInput.checked) {
                easterEgg(character);
                if(clickedCharacter.length < 2){ //if the clicked character is less than 2
                    clickedCharacter.push(character); //add to the clickedCharacter array
                }else{
                    checkboxInput.checked = false; //if the clicked character is more than 2, uncheck the checkbox
                    return;
                }
            }else{
                clickedCharacter = clickedCharacter.filter(function(item) {
                    return item !== character
                })
            }
            //reset to defalut status
            var p1name = document.getElementById("p1-name");
            var p1avatar = document.getElementById("p1-avatar");
            var p2name = document.getElementById("p2-name");
            var p2avatar = document.getElementById("p2-avatar");
            p1name.innerHTML = "Unknown";
            p1avatar.src = "";
            p1avatar.style.zIndex = 1;
            p2name.innerHTML = "Unknown";
            p2avatar.src = "";
            p2avatar.style.zIndex = 1;
            //if the clicked character is 2 after the click, update the player 1 and player 2
            clickedCharacter.forEach(function (character, index) {
                if(index === 0){
                    p1name.innerHTML = character.name;
                    p1avatar.src = character.image_url;
                    p1avatar.style.zIndex = 3;
                }else if(index === 1){
                    p2name.innerHTML = character.name;
                    p2avatar.src = character.image_url;
                    p2avatar.style.zIndex = 3;
                }
            });
            //reset the comparison table reslut
            var p1content = document.getElementById("p1-player-status");
            var p2content = document.getElementById("p2-player-status");
            p1content.style.backgroundColor = "#1f1f1f";
            p2content.style.backgroundColor = "#1f1f1f";
            p1content.innerHTML = "";
            p2content.innerHTML = "";
            if (clickedCharacter.length === 2){
                //clear the previous comparison
                p1content.innerHTML = "";
                p2content.innerHTML = "";
                //create the comparison elements
                var p1result = document.createElement('div');
                p1result.className = "result";
                var p2result = document.createElement('div');

                p1result.className = "player-result";
                p2result.className = "player-result";

                //store the winning elements
                var p1wins = 0;
                var p2wins = 0;

                attributes.forEach(function(attribute) {
                    var p1win = clickedCharacter[0][attribute] >= clickedCharacter[1][attribute];
                    var p2win = clickedCharacter[1][attribute] >= clickedCharacter[0][attribute];
                    
                    p1result.innerHTML += "<img class='checkImage' src='" + (p1win ? imagesrc : noimagesrc) + "' width='30px' height='30px'> ";
                    p2result.innerHTML += "<img class='checkImage' src='" + (p2win ? imagesrc : noimagesrc) + "' width='30px' height='30px'> ";
                    
                    // update counter
                    if (p1win) p1wins++;
                    if (p2win) p2wins++;
                });
                if(p1wins > p2wins){
                    p1content.style.backgroundColor = "#00550C";
                    p2content.style.backgroundColor = "#540000";
                }else if(p1wins < p2wins){
                    p1content.style.backgroundColor = "#540000";
                    p2content.style.backgroundColor = "#00550C";
                }else{
                    p1content.style.backgroundColor = "#00550C";
                    p2content.style.backgroundColor = "#00550C";
                }
                //add elements to the comparison div
                p1content.appendChild(p1result);
                p2content.appendChild(p2result);

                //save to previous comparisons
                var previousComparisons = JSON.parse(localStorage.getItem("previousComparisons")) || [];
                previousComparisons.push(clickedCharacter);
                localStorage.setItem("previousComparisons", JSON.stringify(previousComparisons));

                //realod previous comparisons
                loadPreviousComparisons();
            }
        }

        //create label element
        var checkboxLabel = document.createElement('label');
        checkboxLabel.htmlFor = "checkboxCustom" + character.name;

        //add two elements into the div
        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(checkboxLabel);

        cell9.appendChild(checkboxDiv);
    });
}
function easterEgg(character){
    console.warn("cannot belive you are reading this");
    console.warn("easterEgg-" + character.subtitle);
}
function reloadCharacters() {
    renderCharacterList = characterList;
    
    //clear the table body
    var table = document.getElementById("character-table");
    var tablebody = table.getElementsByTagName('tbody')[0];
    tablebody.innerHTML = "";
    //characters with matching filter values 
    renderCharacterList = characterList.filter(function (character) {
        return character.strength >= filterValues['strength-inputLeft'] && character.strength <= filterValues['strength-inputRight']
            && character.speed >= filterValues['speed-inputLeft'] && character.speed <= filterValues['speed-inputRight']
            && character.skill >= filterValues['skill-inputLeft'] && character.skill <= filterValues['skill-inputRight']
            && character.fear_factor >= filterValues['fear_factor-inputLeft'] && character.fear_factor <= filterValues['fear_factor-inputRight']
            && character.power >= filterValues['power-inputLeft'] && character.power <= filterValues['power-inputRight']
            && character.intelligence >= filterValues['intelligence-inputLeft'] && character.intelligence <= filterValues['intelligence-inputRight']
            && character.wealth >= filterValues['wealth-inputLeft'] && character.wealth <= filterValues['wealth-inputRight'];
    });
    //characters with matching search value
    var searchValue = document.getElementById("search-input").value;
    if(searchValue){
        renderCharacterList = renderCharacterList.filter(function (character) {
            return character.name.toLowerCase().includes(searchValue.toLowerCase());
        });
    }
    loadCharacters(renderCharacterList);
}

function loadPreviousComparisons(){
    var history = JSON.parse(localStorage.getItem("previousComparisons")) || [];
    history = history.slice(-10); //get the last 5 comparisons
    history = history.reverse(); //reverse the order

    var historyContainer = document.getElementById("history-autoinject");
    historyContainer.innerHTML = "";

    history.forEach(function (record) {
        var recordDiv = document.createElement('div');
        recordDiv.className = "record";
        var leftDiv = document.createElement('div');
        var rightDiv = document.createElement('div');

        leftDiv.appendChild(document.createTextNode(record[0].name));
        rightDiv.appendChild(document.createTextNode(record[1].name));

        recordDiv.appendChild(leftDiv);
        recordDiv.appendChild(rightDiv);

        historyContainer.appendChild(recordDiv);
    });
}

window.onload = function () {
    getJsonObject('data.json',
        function (data) {
            characterList = data.Characters; // store the character list into characterList
            // console.log(characterList); // print it into console (developer tools)
            // console.log(characterList[0]); // print the first character object to the console
            // here you can call methods to load or refresh the page
            loadCharacters(characterList) //or refreshPage()
        },
        function (xhr) {
            console.error(xhr);
        }
    );
    attributes.forEach(function (filterName) {
        initializeSlider(filterName+"-inputLeft", filterName+"-inputRight", filterName+"-rangeLeft", filterName+"-rangeRight", filterName+"-slider-track", slideLeftOnchange, slideRightOnchange);
    });loadPreviousComparisons()
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
    var filterContainer = document.getElementById('injection');

    attributes.forEach(function (filterName) {
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
        filterValues[filterName.toLowerCase() + '-inputLeft'] = inputLeft.value;
        inputLeft.onchange = function(){
            filterValues[filterName.toLowerCase() + '-inputLeft'] = inputLeft.value;
            reloadCharacters();
        }

        var inputRight = document.createElement('input');
        inputRight.type = 'range';
        inputRight.min = '0';
        inputRight.max = '100';
        inputRight.value = '100';
        inputRight.className = 'inputRight';
        inputRight.id = filterName.toLowerCase() + '-inputRight';
        filterValues[filterName.toLowerCase() + '-inputRight'] = inputRight.value;
        inputRight.onchange = function(){
            filterValues[filterName.toLowerCase() + '-inputRight'] = inputRight.value;
            reloadCharacters();
        }

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

