
navigator.geolocation.getCurrentPosition(async position => {
    console.log("adding a repIllness");
    console.log(position.coords.latitude);
    const userID = 1234;
    const venueID = 0;
    const address = "this is the way";
    const city = "Wayne";
    const state = "NJ";
    const zipCode = "07470";
    const repDate = "02/21/2023"
    const data = { userID, venueID, address, city, state, zipCode, repDate };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch('/addRepIllness', options);
    const jdata = await response.json();
    console.log(jdata, jdata.type.length);
});