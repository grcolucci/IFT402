navigator.geolocation.getCurrentPosition(async position => {
    console.log("adding a User Location");
    console.log(position.coords.latitude);
    const userID = 1234;
    const streetAddr = "240 park Lane";
    const city = "Wayne";
    const state = "NJ";
    const zipCode = "07470";
    const venueID = 98765
    const data = {userID, streetAddr, city, state, zipCode, venueID };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch('/adduserLocation', options);
    const jdata = await response.json();
    console.log(jdata, jdata.type.length);
});