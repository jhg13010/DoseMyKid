// get variables from the dom 
var weightEl = document.querySelector("#lbs");
var dosageEl = document.querySelector("#dosge");

// event listener for wight
weightEl.addEventListener('click', function () {

    // fetch 
    fetch(`https://api.fda.gov/drug/drugsfda.json?search=${weightEl.value}products.dosage_form:"LOTION"&limit=1`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        })
    // save users value
    var input = document.getElementById("input").value
    console.log(input)

    // display in the output 

    document.getElementById('output').value = input / 2.205 + "kg"
})