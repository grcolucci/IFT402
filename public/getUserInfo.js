

function buttonClicked() {

    console.log("Rep Illness Head Submitted")
    navigator.geolocation.getCurrentPosition(async position => {

    const userID = document.getElementById("userID").checked;

    console.log("getting userInfo for " userID);


    const data = { userID };
    console.log(data)
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch('/getUserInfo', options);
    const jdata = await response.json();
    console.log(jdata);

    
    uiName = document.getElementById("uiName");
    uiName.textContent = jdata.body.userInfo.name

    uiStreet = document.getElementById("uiStreet");
    uiStreet.textContent = jdata.body.userInfo.streetAddress

    uicity = document.getElementById("uiCity");
    uicity.textContent = jdata.body.userInfo.city

    uistate = document.getElementById("uiState");
    uistate.textContent = jdata.body.userInfo.state

    uizipcode = document.getElementById("uiZipCode");
    uizipcode.textContent = jdata.body.userInfo.zipcode

    




});
}

submitElem = document.getElementById("getUIbutton");

submitElem.addEventListener('click', buttonClicked, false);


