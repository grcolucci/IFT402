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
        if (hSymptom1 || hSymptom2 || hSymptom3 || hSymptom4 || hSymptom5 || hSymptom6) {
            console.log("For Head")
            const userID = 1234;
            const venueID = 0;
            const address = "4 Oak Lane";
            const city = "Wayne";
            const state = "NJ";
            const zipCode = "07470";
            // const repDate = "02/21/2023";
            const bodyLoc = "head";
            const data = {
                userID,
                venueID,
                address,
                city,
                state,
                zipCode,
              //  repDate,
                bodyLoc,
                hSymptom1,
                hSymptom2,
                hSymptom3,
                hSymptom4,
                hSymptom5,
                hSymptom6
            };
            console.log(data)
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/addRepIllness', options);
            const jdata = await response.json();
            console.log(jdata, jdata.type.length);

            alert("Illness Recorded: " + jdata.status);
        }

        const eSymptom1 = document.getElementById("ent1").checked;
        const eSymptom2 = document.getElementById("ent2").checked;
        const eSymptom3 = document.getElementById("ent3").checked;
        const eSymptom4 = document.getElementById("ent4").checked;
        const eSymptom5 = document.getElementById("ent5").checked;
        const eSymptom6 = document.getElementById("ent6").checked;
    
        if (eSymptom1 || eSymptom2 || eSymptom3 || eSymptom4 || eSymptom5 || eSymptom6) {
            console.log("For Ear, Nose")
            const userID = 1234;
            const venueID = 0;
            const address = "4 Oak Lane";
            const city = "Wayne";
            const state = "NJ";
            const zipCode = "07470";
            // const repDate = "02/21/2023";
            const bodyLoc = "Ear,Nose";
            const data = {
                userID,
                venueID,
                address,
                city,
                state,
                zipCode,
              //  repDate,
                bodyLoc,
                hSymptom1,
                hSymptom2,
                hSymptom3,
                hSymptom4,
                hSymptom5,
                hSymptom6
            };
            console.log(data)
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/addRepIllness', options);
            const jdata = await response.json();
            console.log(jdata, jdata.type.length);

            alert("Illness Recorded: " + jdata.status);
        }

    });
}

submitElem = document.getElementById("submitButton");

submitElem.addEventListener('click', buttonClicked, false);