const MAINLISTSIZE = 15;

const IMGHEIGHT = 350;
const IMGWIDTH = 500;

const mediaDir = "media/";

illness = ["Cold", "Flu", "Covid", "Headache", "Soar Throat", "Congestion", "Rash", "Ear Ache", "Runny Nose", "Cough"];
repillness = [];

function logSomething() {
    console.log("something")
}

// repIllnesses Obj 
function repIllnesses(date, illness, location, state) {
    this.date = date;
    this.illness = illness;
    this.location = location;
    this.state = state;
    this.getMenuString = getMenuString;

    function getMenuString() {
        return (`${date} ${illness} ${state} ${location}`);
    }

}

// Make a call to the DB to get the list of reported illnesses

navigator.geolocation.getCurrentPosition(async position => {
    console.log("Get the reported illnesses");
    const data = {};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/getRepillnesses', options);
    const jdata = await response.json()
    console.log(jdata.type, jdata.type.length)
    titleElem = document.getElementById("bname");
    textElem = document.createTextNode(jdata.type[0].repIllnessID);
    if (titleElem.childNodes.length == 0) {
        titleElem.appendChild(textElem);
    } else {
        titleElem.replaceChild(textElem, titleElem.childNodes[0]);
    }

    // Create the list of reported illnesses Objs
    for (x = 0; x < jdata.type.length; x++) {
        console.log("Adding to list", jdata.type[x].type)
        repillness.push(new repIllnesses(jdata.type[x].repDate, illness[Math.floor(Math.random() * 10)], "Home", jdata.type[x].address));
    }

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
        // populateDisplay(0);

        // Add event listener for reported illnesses list
        listElem.addEventListener('click', listClicked, false);

    }



});

// Populate the display for the selected menu item
function populateDisplay(index) {
    // Populate the display
    titleElem = document.getElementById("illnesslisttitle");
    textElem = document.createTextNode(repillness[index].repIllnessID);

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
    console.log("Selected: ", done)
    populateDisplay(done);

}