// Glenn Coucci - IFT 301 - Milestone Project

// Setup some data to populate the lists and items
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

illness = ["Cold", "Flu", "Covid", "Headache", "Soar Throat", "Congestion", "Rash", "Ear Ache", "Runny Nose", "Cough"];
states = ["VA", "AZ", "NY", "NJ", "FL", "CA", "NC", "TX", "MN", "VT"];
repillness = [];

const MAINLISTSIZE = 15;

const IMGHEIGHT = 350;
const IMGWIDTH = 500;

const mediaDir = "media/";

function populateDisplay(index) {
    // Populate the display
    titleElem = document.getElementById("illnesslisttitle");
    //  textElem = document.createTextNode(repillness[index].bird);
    textElem = document.createTextNode("Illness List");
  


    titleElem = document.getElementById("bname");
    textElem = document.createTextNode("Illness Levels as of 2/29/2023");
    if (titleElem.childNodes.length == 0) {
        titleElem.appendChild(textElem);
    } else {
        titleElem.replaceChild(textElem, titleElem.childNodes[0]);
    }
    // Img
    imgElem = document.getElementById("bimg");
    imgElem.src = "download.webp";
    imgElem.alt = "Illnesses as of 1/29/2023";

    imgElem.setAttribute("width", IMGWIDTH);
    imgElem.setAttribute("height", IMGHEIGHT);

    // Audio
    //audElem = document.getElementById("bcall-mp3")
        // audElem.pause();
        //audElem.src = mediaDir + repillness[index].bird.toString().toLowerCase() + ".mp3";
    //audElem.setAttribute("src", mediaDir + repillness[index].bird.toString().toLowerCase() + ".mp3");
    //audElem.load();
    //audElem.autoplay = true;
    //audElem.load();
    //audElem.play();

    // titleElem = document.getElementById("mediaSrc");
    // textElem = document.createTextNode("Media: <a href=\"http://www.azfo.org/index.html\">azfo.org</a>");
    // if (titleElem.childNodes.length == 0) {
    //     titleElem.appendChild(textElem);
    // } else {
    //     titleElem.replaceChild(textElem, titleElem.childNodes[0]);
    // }
}

// Action for when a user clicks on a sighting
function listClicked() {
    // Get the sighting selected
    var done = document.getElementById("repIllnessesList").value;

    populateDisplay(done);

}

// repIllnesses Obj 
function repIllnesses(date, illness, cnt, location, state) {
    this.date = date;
    this.illness = illness;
    this.cnt = cnt;
    this.location = location;
    this.state = state;
    this.getMenuString = getMenuString;

    function getMenuString() {
        return (`${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()} ${illness} ${cnt} ${state} ${location}`);
    }

}

// Create the list of reported illnesses Objs
for (x = 0; x < 20; x++) {
    repillness.push(new repIllnesses(new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)), illness[Math.floor(Math.random() * 10)], 1, "Hometown", states[Math.floor(Math.random() * 10)]));
    repillness.push(new repIllnesses(new Date(+(new Date()) - Math.floor(Math.random() * 100000000000)), illness[Math.floor(Math.random() * 10)], 1, "Hometown", states[Math.floor(Math.random() * 10)]));

}

// Sort by date (descending)
repillness.sort(function(a, b) {
    return b.date - a.date
})

// Populate the reported illnesses menu
for (x = 0; x < repillness.length; x++) {

    listElem = document.getElementById("repIllnessesList");
    listElem.setAttribute("size", MAINLISTSIZE);

    itemElem = document.createElement("option");
    newListItem = document.createTextNode(repillness[x].getMenuString());
    // Set the value to be used when a selection is made
    itemElem.setAttribute("value", x);
    itemElem.appendChild(newListItem);
    listElem.appendChild(itemElem);

    //set the display box to the first signting
    populateDisplay(0);

}

// Add event listener for reported illnesses list
listElem.addEventListener('click', listClicked, false);