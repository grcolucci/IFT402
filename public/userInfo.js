// Action for when a user adds/updates user info
function saveUI() {

    navigator.geolocation.getCurrentPosition(async position => {
        console.log("adding a User Info");
        console.log(position.coords.latitude);
        const name = document.getElementById("uiName").value;
        const streetAddr = document.getElementById("uiStreet").value;
        const city = document.getElementById("uiCity").value;
        const state = document.getElementById("uiState").value;
        const zipCode =document.getElementById("uiZipCode").value;
        const data = {
            name,
            streetAddr,
            city,
            state,
            zipCode
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/adduserInfo', options);
        const jdata = await response.json();
        console.log(jdata, jdata.type.length);

        // display user id
        idField = document.getElementById("userID");
        //  textElem = document.createTextNode(repillness[index].bird);
        textElem = document.createTextNode("Illness List");
    });

}

// Action for when a user adds a new location to track
function addLoc() {

    navigator.geolocation.getCurrentPosition(async position => {
        console.log("adding a User Location");

        const userID = document.getElementById("userID").value;

        const venueID = document.getElementById("locVenueList").value;
        
        const name = document.getElementById("uiName").value;
        const streetAddr = document.getElementById("uiStreet").value;
        const city = document.getElementById("uiCity").value;
        const state = document.getElementById("uiState").value;
        const zipCode =document.getElementById("uiZipCode").value;
        const data = {
            userID,
            venueID,
            name,
            streetAddr,
            city,
            state,
            zipCode
        };


        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/addLocation', options);
        const jdata = await response.json();
        console.log(jdata, jdata.type.length);
    });

}



navigator.geolocation.getCurrentPosition(async position => {

    const data = {};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/getVenues', options);
    const jdata = await response.json();
    console.log(jdata, jdata.venues);

    // Populate the Venues menu
    for (x = 0; x < jdata.venues.length; x++) {

        listElem = document.getElementById("locVenueList");
        listElem.setAttribute("size", MAINLISTSIZE);

        itemElem = document.createElement("option");
        newListItem = document.createTextNode(jdata.venues[x].name + "\t" + jdata.venues[x].city);
        // Set the value to be used when a selection is made
        itemElem.setAttribute("value", jdata.venues[x].idVenues);
        itemElem.appendChild(newListItem);
        listElem.appendChild(itemElem);


    }
});

submitElem = document.getElementById("submitUI");
submitElem.addEventListener('click', saveUI, false);

submitElem = document.getElementById("addLoc");
submitElem.addEventListener('click', addLoc, false);