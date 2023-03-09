navigator.geolocation.getCurrentPosition(async position => {
    console.log("adding a User Info");
    console.log(position.coords.latitude);
    const name = "Glenn Colucci";
    const streetAddr = "240 park Lane";
    const city = "Wayne";
    const state = "NJ";
    const zipCode = "07470";
    const data = { name, streetAddr, city, state, zipCode };
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    const response = await fetch('/adduserInfo', options);
    const jdata = await response.json();
    console.log(jdata, jdata.type.length);
});