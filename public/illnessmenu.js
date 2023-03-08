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
        return (`${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()} ${illness} ${state} ${location}`);
    }

}

navigator.geolocation.getCurrentPosition(async position => {
    console.log("yyyyy");
    console.log(position.coords.latitude);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const data = { lat, lon };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const jdata = await response.json()
    console.log(jdata.type[0].type, jdata.type.length)
    titleElem = document.getElementById("bname");
    textElem = document.createTextNode(jdata.type[0].type);
    if (titleElem.childNodes.length == 0) {
        titleElem.appendChild(textElem);
    } else {
        titleElem.replaceChild(textElem, titleElem.childNodes[0]);
    }

    // Create the list of reported illnesses Objs
    for (x = 0; x < jdata.type.length; x++) {
        console.log("Adding to list",jdata.type[x].type)
        repillness.push(new repIllnesses(new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)), illness[Math.floor(Math.random() * 10)], 1, "Home", jdata.type[x].type));
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
        populateDisplay(0);

    }



}); 