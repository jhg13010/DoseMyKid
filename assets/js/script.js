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
    var drugWeightInput = document.querySelector("#weight").value;
    var drugMedicationInput = document.querySelector("#medication").value;
    var drugDosageInput = document.querySelector("#dosage").value;

    //validate inputs 
    if (!drugWeightInput || !drugDosageInput || !drugMedicationInput) {
        //NEED TO CONVERT TO MODAL
        alert("You need to fill out the full form");
        return false;
    }

    //reset form 
    formEl.reset();

    var drugDataObj = {
        weight: drugWeightInput,
        dosage: drugDosageInput,
        medication: drugMedicationInput,
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
    drugHeadingEl.className = "drug-heading"

    //create the heading for the li
    drugHeadingEl.innerHTML = "<h3 class='drug-name'>" + drugDataObj.medication + "</h3>";
    //append heading to the li 
    listItemEl.appendChild(drugHeadingEl);

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

/*var dosageConversion = function () {
    //convert weight from lbs to kgs
    var weightKgs = (weightEl.value / 2.205).toFixed(2);
        console.log(weightKgs);    

    var dosageEl = document.querySelector("#dosage");
        console.log(dosageEl.value);

    
}*/

// event listener for form submission
buttonEl.addEventListener('click', formSubmitHandler);

var getDrugInfo = function() {
    fetch("https://api.fda.gov/drug/label.json?search=dosage_forms_and_strengths:'acetaminophen'").then(function(response) {
        return response.json().then(function(data) {
            console.log(data.results[0]);
        });
    });
};

getDrugInfo();

