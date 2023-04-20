const MAINLISTSIZE = 15

// Action for when a user adds/updates user info
function saveUI() {
    console.log("adding a User Info");
    navigator.geolocation.getCurrentPosition(async position => {
        const name = document.getElementById("uiName").value;
        const streetAddr = document.getElementById("uiStreet").value;
        const city = document.getElementById("uiCity").value;
        const state = document.getElementById("uiState").value;
        const zipCode = document.getElementById("uiZipCode").value;
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
        console.log("jdata ", jdata.userInfo.insertId);

        // display user id
        idField = document.getElementById("userID");
        idField.setAttribute("value", jdata.userInfo.insertId)
        textElem = document.createTextNode("Illness List");

        alert("Add User Information: " + jdata.status);

    });

}

// Action for when a user adds/updates user info
function getUI() {

    navigator.geolocation.getCurrentPosition(async position => {
        const userID = document.getElementById("userID").value;
        console.log("getting User Info: ", userID);
        if (userID == "") {
            return;
        }

        const data = {
            userID
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/getuserInfo', options)
        const jdata = await response.json()

        console.log("Response ", jdata.userInfo[0].venName)

        document.getElementById("uiName").value = jdata.userInfo[0].uiName;
        document.getElementById("uiStreet").value = jdata.userInfo[0].uiStreet;
        document.getElementById("uiCity").value = jdata.userInfo[0].uiCity;
        document.getElementById("uiState").value = jdata.userInfo[0].uiState;
        document.getElementById("uiZipCode").value = jdata.userInfo[0].uiZipcode;

        // Populate the locations menu
        listElem = document.getElementById("savVenueList");
        listElem.setAttribute("size", MAINLISTSIZE);

        listElem.options.length = 0
        for (x = 0; x < jdata.userInfo.length; x++) {
            itemElem = document.createElement("option");
            newListItem = document.createTextNode(jdata.userInfo[x].venName + "\t" + jdata.userInfo[x].venCity);
            // Set the value to be used when a selection is made
            itemElem.setAttribute("value", jdata.userInfo[x].idUserLocations);
            itemElem.appendChild(newListItem);
            listElem.appendChild(itemElem);
        }

        populateVenueMenu();

    });
}


// Action for when a user adds a new location to track
function addLoc() {

    navigator.geolocation.getCurrentPosition(async position => {
        console.log("adding a User Location");

        const userID = document.getElementById("userID").value;

        venueID = document.getElementById("locVenueList").value;
        console.log("Ven ", venueID, venueID.length)
        if (venueID.length == 0) {
            venueID = 0;
        }

        const streetAddress = document.getElementById("locStreet").value;
        const city = document.getElementById("locCity").value;
        const state = document.getElementById("locState").value;
        const zipCode = document.getElementById("locZipCode").value;
        const data = {
            userID,
            venueID,
            streetAddress,
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
        const response = await fetch('/addUserLocation', options);
        const jdata = await response.json();
        console.log(jdata);

        alert("Add User Location: " + jdata.status);
    });

}

// Action for when a user deltes a location
function delLoc() {

    navigator.geolocation.getCurrentPosition(async position => {
        console.log("deleting a User Location");

        // const userID = document.getElementById("userID").value;

        idUserLocations = document.getElementById("savVenueList").value;

        const data = {
            idUserLocations,
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/delUserLocation', options);
        const jdata = await response.json();
        console.log(jdata);

        alert("User Location Deleted: " + jdata.status);
    });

}

// Action for when a user adds a new location to track
function getUserLocations() {

    navigator.geolocation.getCurrentPosition(async position => {
        console.log("getting a Users Locations");

        const userID = document.getElementById("userID").value;

        const data = {
            userID,
        };


        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/getLocations', options);
        const jdata = await response.json();
        console.log("Response ", jdata);
    });

}


function populateVenueMenu() {
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
        console.log("Venues List Return", jdata, jdata.venues);

        listElem = document.getElementById("locVenueList");

        listElem.options.length = 0

        itemElem = document.createElement("option");
        newListItem = document.createTextNode("None");
        // Set the value to be used when a selection is made
        itemElem.setAttribute("value", 0);
        itemElem.appendChild(newListItem);
        listElem.appendChild(itemElem);

        // Populate the Venues menu
        for (x = 0; x < jdata.venues.length; x++) {
            itemElem = document.createElement("option");
            newListItem = document.createTextNode(jdata.venues[x].name + "\t" + jdata.venues[x].city);

            // Set the value to be used when a selection is made
            itemElem.setAttribute("value", jdata.venues[x].idVenues);
            itemElem.appendChild(newListItem);
            listElem.appendChild(itemElem);
        }
    });
}



submitElem = document.getElementById("submitUI");
submitElem.addEventListener('click', saveUI, false);

submit2Elem = document.getElementById("addLoc");
submit2Elem.addEventListener('click', addLoc, false);

submit3Elem = document.getElementById("getUI");
submit3Elem.addEventListener('click', getUI, false);

submit2Elem = document.getElementById("delLoc");
submit2Elem.addEventListener('click', delLoc, false);
