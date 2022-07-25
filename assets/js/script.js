
var button = document.querySelector("#btn");

var dosageConversion = function () {
    // get variables from the dom 
    var weightEl = document.querySelector("#weight");
    console.log(weightEl.value);
    //convert weight from lbs to kgs
    var weightKgs = (weightEl.value / 2.205).toFixed(2);
        console.log(weightKgs);    
    
    //get dosage from the dom
    var dosageEl = document.querySelectorAll("dosage");
    console.log(dosageEl.value);

    var dosageEl = document.querySelector("#dosage");
        console.log(dosageEl.value);

    
}

// event listener for form submission
button.addEventListener('click', dosageConversion);

var getDrugInfo = function() {
    fetch("https://api.fda.gov/drug/label.json?search=overdosage:'benadryl'").then(function(response) {
        return response.json().then(function(data) {
            console.log(data);
        });
    });
};

getDrugInfo();