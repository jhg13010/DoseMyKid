//connect to form
var formEl = document.querySelector("#drug-form");
//connect to form submit button
var buttonEl = document.querySelector("#btn");
//connect to HTML drug list
var drugListEl = document.querySelector("#drug-list");

//id counter to add IDs to drug cards
var drugIdCounter = 0;
//drugs array for storage
var drugs = [];

var limit = function (string = "", limit = 0) {
  return string.substring(0, limit);
};

var formSubmitHandler = function (event) {
  event.preventDefault();

  // get variables from the dom
  var drugNameInput = document.querySelector("#name").value;
  var drugAgeInput = document.querySelector("#age").value;
  var drugWeightInput = (
    document.querySelector("#weight").value / 2.205
  ).toFixed(2);
  var drugMedicationInput = document.querySelector("#medication").value;
  var drugDosageInput = "";
  var drugUseInput = "";
  var drugGenericName = "";

  //validate inputs
  if (!drugWeightInput || !drugMedicationInput) {
    //NEED TO CONVERT TO MODAL
    alert("You need to fill out the full form");
    return false;
  }

  var getDrugInfo = function (drug) {
    var apiUrlFDA =
      "https://api.fda.gov/drug/label.json?search=indications_and_usage:" +
      drug;

    var drugInfo = fetch(apiUrlFDA).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayDrugInfo(data);
        });
      } else {
        console.log("ERROR WITH DATA");
      }
    });

    var apiUrlRapid =
      "https://drug-info-and-price-history.p.rapidapi.com/1/druginfo?drug=" +
      drug;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "27a92e4c0cmsh2a354ddcb5cf9b8p1ac9e5jsnd942496c0148",
        "X-RapidAPI-Host": "drug-info-and-price-history.p.rapidapi.com",
      },
    };

    fetch(apiUrlRapid, options).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          drugGenericName = limit(data[0].generic_name, 30);

          var drugDataObj = {
            name: drugNameInput,
            age: drugAgeInput,
            weight: drugWeightInput,
            medication: drugMedicationInput,
            dosage: drugDosageInput,
            indication: drugUseInput,
            generic: drugGenericName,
          };
          createDrugEl(drugDataObj);
        });
      }
    });
  };

  var displayDrugInfo = function (info) {
    var drugIndication = info.results[0].indications_and_usage[0];

    if (drugIndication.includes("pain" || "PAIN")) {
      drugUseInput = "Pain";
    } else if (drugIndication.includes("allergic")) {
      drugUseInput = "Allergies";
    }
  };
  var getDosage = function () {
    if (drugMedicationInput === "Tylenol") {
      drugDosageInput = drugWeightInput * 15 + "mg";
    } else if (drugMedicationInput === "Motrin") {
      drugDosageInput = drugWeightInput * 10 + "mg";
    } else if (drugMedicationInput === "Benadryl") {
      drugDosageInput = drugWeightInput * 2 + "mg";
    }
  };

  getDosage();
  getDrugInfo(drugMedicationInput);

  //reset form
  formEl.reset();
};

var createDrugEl = function (drugDataObj) {
  //create a list item container for the query
  var listItemEl = document.createElement("li");
  listItemEl.className = "drug-item";
  //add data id to the item container
  listItemEl.setAttribute("data-drug-id", drugIdCounter);

  //create a heading for the li
  var drugHeadingEl = document.createElement("div");
  drugHeadingEl.className = "drug-heading";
  //create the heading for the li
  drugHeadingEl.innerHTML =
    "<h2 class='drug-name'>" + drugDataObj.medication + "</h2>";
  //append heading to the li
  listItemEl.appendChild(drugHeadingEl);

  var drugDosageEl = document.createElement("div");
  drugDosageEl.className = "dosage-info";
  drugDosageEl.innerHTML =
    "<h3 class='dosage-info'> Your Child's Dose: " +
    drugDataObj.dosage +
    "</h3>";
  listItemEl.appendChild(drugDosageEl);

  var patientInfoEl = document.createElement("p");
  patientInfoEl.className = "patient-info";
  patientInfoEl.innerHTML =
    "Name: " +
    drugDataObj.name +
    "<br> Age: " +
    drugDataObj.age +
    "<br> Indication: " +
    drugDataObj.indication +
    "<br> Generic Name: " +
    drugDataObj.generic;
  listItemEl.appendChild(patientInfoEl);

  //append drug query to the queries listing
  drugListEl.appendChild(listItemEl);

  //assign the query array the id of the counter
  drugDataObj.id = drugIdCounter;
  //assign the query array to the drugs array for us in localStorage
  drugs.push(drugDataObj);

  //increment the counter for the next query
  drugIdCounter++;

  saveDrugs();
};

console.log(drugs);

var saveDrugs = function () {
  localStorage.setItem("drugs", JSON.stringify(drugs));
};

var loadDrugs = function () {
  var savedDrugs = localStorage.getItem("drugs");
  //if no drugs, set drugs to empty array and exit function
  if (!savedDrugs) {
    return false;
  }
  console.log("saved drugs found");

  //parse local storage into JSON
  savedDrugs = JSON.parse(savedDrugs);

  //loop through savedDrugs array to append the localStorage to the page at the startup of the page
  for (var i = 0; i < savedDrugs.length; i++) {
    createDrugEl(savedDrugs[i]);
  }
  console.log(savedDrugs);
};

// event listener for form submission
buttonEl.addEventListener("click", formSubmitHandler);

loadDrugs();
