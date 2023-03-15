

function buttonClicked() {

    console.log("Rep Illness Head Submitted")
    navigator.geolocation.getCurrentPosition(async position => {

    const hSymptom1 = document.getElementById("Headache").checked;
    const hSymptom2 = document.getElementById("Dizziness").checked;
    const hSymptom3 = document.getElementById("LightHeadedness").checked;
    const hSymptom4 = document.getElementById("Nausea").checked;
    const hSymptom5 = document.getElementById("Fever").checked;
    const hSymptom6 = document.getElementById("NA").checked;
  
    console.log("adding a repIllness");
    console.log(hSymptom1, hSymptom2);
    const userID = 1234;
    const venueID = 0;
    const address = "this is the way";
    const city = "Wayne";
    const state = "NJ";
    const zipCode = "07470";
    const repDate = "02/21/2023"
    const data = { userID, venueID, address, city, state, zipCode, repDate, hSymptom1, hSymptom2, hSymptom3, hSymptom4, hSymptom5, hSymptom6 };
    console.log(data)
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch('/addRepIllness', options);
    const jdata = await response.json();
    console.log(jdata, jdata.type.length);

});
}

submitElem = document.getElementById("submitButton");

submitElem.addEventListener('click', buttonClicked, false);


