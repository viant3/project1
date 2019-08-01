var firebaseConfig = {
  apiKey: "AIzaSyBPXZRRbIQdmxEssPiQe0aj8dhmckYwVbc",
  authDomain: "patientdata-a30c6.firebaseapp.com",
  databaseURL: "https://patientdata-a30c6.firebaseio.com",
  projectId: "patientdata-a30c6",
  storageBucket: "",
  messagingSenderId: "302081086597",
  appId: "1:302081086597:web:9b2ba15857096d2b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


// Capture Button Click
$("#clickme").on("click", function (event) {
event.preventDefault();

// Grabbed values from text-boxes
var insurance = $("#provider-input option:selected").val();
var insuranceDisplay = insurance.split(/\s(.+)/)[0]; 
var specialty = $("#specialty-input option:selected").val().toLowerCase();
var city = $("#city-input").val().trim().replace(' ', '-').toLowerCase();
var state = $("#state-input option:selected").val().toLowerCase();


  // Code for "Setting values in the database"
  var newPatient = {
    insurance: insuranceDisplay,
    specialty: specialty,
    city: city,
    state: state,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };

  database.ref().push(newPatient);


});

// Firebase watcher + initial loader HINT: .on("value")
database.ref().on("child_added", function (snapshot) {

  var tr = $("<tr>");


  // Change the HTML to reflect
  var tdinsurance = $("<td>").text(snapshot.val().insurance);
  var tdspecialty = $("<td>").text(snapshot.val().specialty);
  var tdcity = $("<td>").text(snapshot.val().city);
  var tdstate = $("<td>").text(snapshot.val().state);
  var tddateAdded = $("<td>").text(snapshot.val().dateAdded);
  


  tr.append(tdinsurance).append(tdspecialty).append(tdcity).append(tdstate).append(tddateAdded);

  $(".patientData").append(tr);

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);

});
