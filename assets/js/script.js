//connect to form 
var formEl = document.querySelector("#drug-form")
//connect to form submit button
var buttonEl = document.querySelector("#btn");
//connect to HTML drug list
var drugListEl = document.querySelector("#drug-list");

//id counter to add IDs to drug cards
var drugIdCounter = 0;
//drugs array for storage 
var drugs = []


var formSubmitHandler = function(event) {
    event.preventDefault();

    // get variables from the dom 
    var drugNameInput = document.querySelector("#name").value;
    var drugAgeInput = document.querySelector("#age").value;
    var drugWeightInput = (document.querySelector("#weight").value / 2.205).toFixed(2);
    var drugMedicationInput = document.querySelector("#medication").value;
    var drugDosageInput = ""
    var drugUseInput = ""
    
    //validate inputs 
    if (!drugWeightInput || !drugMedicationInput) {
        //NEED TO CONVERT TO MODAL
        alert("You need to fill out the full form");
        return false;
    }
    
    var getDrugInfo = function(drug) {
        var apiUrlFDA = "https://api.fda.gov/drug/label.json?search=indications_and_usage:" + drug;

        var drugInfo = fetch(apiUrlFDA).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayDrugInfo(data);
                });
            } else {
                console.log("ERROR WITH DATA");
            };
        });
    }

    var displayDrugInfo = function(info) {
        var drugIndication = info.results[0].indications_and_usage[0];
    
        if (drugIndication.includes("pain" || "PAIN")) {
            drugUseInput = "Pain";

        } else if (drugIndication.includes("allergic")) {
            drugUseInput = "Allergies";
        };
    };

    var getDosage = function() {
        if (drugMedicationInput === "Acetaminophen") {
            drugDosageInput = drugWeightInput*15 + "mgs";
    
        } else if (drugMedicationInput === "Ibuprofen") {
            drugDosageInput = drugWeightInput*10 + "mgs";
    
        } else if (drugMedicationInput === "Benadryl") {
            drugDosageInput = drugWeightInput*2 +"mgs";
        };
    } 

    getDosage();
    getDrugInfo(drugMedicationInput);

    //reset form 
    formEl.reset();

    var drugDataObj = {
        name: drugNameInput,
        age: drugAgeInput,
        weight: drugWeightInput,
        medication: drugMedicationInput,
        dosage: drugDosageInput,
        indication: drugUseInput,
    }

    createDrugEl(drugDataObj);
}

var createDrugEl = function(drugDataObj) {
    console.log(drugDataObj);

    //create a list item container for the query
    var listItemEl = document.createElement("li");
    listItemEl.className = "drug-item"

    //add data id to the item container
    listItemEl.setAttribute("data-drug-id", drugIdCounter);

    //create a heading for the li
    var drugHeadingEl=document.createElement("div");
    drugHeadingEl.className = "drug-heading";

    //create the heading for the li
    drugHeadingEl.innerHTML = "<h2 class='drug-name'>" + drugDataObj.medication + "</h2>";
    //append heading to the li 
    listItemEl.appendChild(drugHeadingEl); 
    
    var drugDosageEl=document.createElement("div");
    drugDosageEl.className="dosage-info";
    drugDosageEl.innerHTML = "<h3 class='dosage-info'> Your Child's Dose: " + drugDataObj.dosage + "</h3>";
    listItemEl.appendChild(drugDosageEl);

    var patientInfoEl=document.createElement("p");
    patientInfoEl.className="patient-info";
    patientInfoEl.innerHTML = "Name: " + drugDataObj.name + "<br> Age: " + drugDataObj.age;
    listItemEl.appendChild(patientInfoEl)

    //append drug query to the queries listing
    drugListEl.appendChild(listItemEl);

    //assign the query array the id of the counter 
    drugDataObj.id = drugIdCounter;
    //assign the query array to the drugs array for us in localStorage 
    drugs.push(drugDataObj);

    //increment the counter for the next query
    drugIdCounter++;

    saveDrugs();
}

var saveDrugs = function() {
    localStorage.setItem("drugs", JSON.stringify(drugs));
}


// event listener for form submission
buttonEl.addEventListener('click', formSubmitHandler);






    /*fetch("https://api.lexigram.io/v1/lexigraph/extract/entities", {
        headers: {
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdSI6Imx4ZzphcGkiLCJzYyI6WyJrZzpyZWFkIiwiZXh0cmFjdGlvbjpyZWFkIl0sImFpIjoiYXBpOmI3MjgzNWE1LTA0MzgtYThhMi04OTg0LWMxMTcxNzUxNTI5OCIsInVpIjoidXNlcjo1ZDIzNzk4Zi1mMmFmLWJlMzgtMTgyZS0wMjM2OGU3Zjk5MWYiLCJpYXQiOjE2NTg4OTIwNTl9.5AyZ5D6zH9udQS-4r1N4-2n8cBGyBF3Tji-F4X_dgac"
        }
    }).then(function(response) {
        return response.json().then(function(data) {
            console.log(data);
        });
    });*/