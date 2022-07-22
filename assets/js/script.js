
var getDrugInfo = function() {
    fetch("https://api.drugbank.com/v1/drugs//indications").then(function(response) {
        return response.json().then(function(data) {
            console.log(data.results[0]);
        });
    });
};

getDrugInfo();



//var apiURL = "https://api.fda.gov/drug/event.json?limit=1";

//fetch(apiURL).then(function(response) {
  //  console.log()
//});

