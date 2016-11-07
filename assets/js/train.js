// Initialize Firebase
var config = {
    apiKey: "AIzaSyDPdVt3MtTA7RvlcE9H-V2RzW2fVOrVgac",
    authDomain: "trainschedule-dca29.firebaseapp.com",
    databaseURL: "https://trainschedule-dca29.firebaseio.com",
    storageBucket: "trainschedule-dca29.appspot.com",
    messagingSenderId: "659167888291"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function() { 

$('#submitBtn').on('click', function () {
		var railName = $("#railName").val().trim();
		var trainID = $("#trainID").val().trim();
		var destination= $("#destination").val().trim();
		var startTime= $("#startTime").val().trim();
		var frequency= $("#frequency").val().trim();
			console.log(railName);

		var newRail = {
			name: railName,
			train: trainID,
			location: destination,
			firstTime: startTime,
			freq: frequency
	}
		database.ref().push(newRail);
	
		return false;
	});

/////

database.ref().on("child_added", function(childSnapshot){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var railName = childSnapshot.val().name;
	var trainID = childSnapshot.val().train;
	var destination = childSnapshot.val().location;
	var startTime = childSnapshot.val().firstTime;
	var frequency = childSnapshot.val().freq;

	//  Train Info
	console.log(railName);
	console.log(trainID);
	console.log(destination);
	console.log(frequency);
	
	//Time Math
	var firstTimeConverted = moment(startTime, "hh:mm")
	console.log("This is first time converted: " + firstTimeConverted);
	
	var currentTime = moment();
	console.log("Current time: " + moment(currentTime).format("hh:mm"));
	
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in time: " + diffTime);
	
	

//	// Prettify the employee start
//	var empStartPretty = moment.unix(frequency).format("MM/DD/YY");
//	// Calculate the months worked using hardconre math
//	// To calculate the months worked
//	var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
//	console.log(frequency);
//
//	// Calculate the total billed rate
//	var empBilled = empMonths * empRate;
//	console.log(frequency);

	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + railName + "</td><td>" + trainID + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + railName + "</td><td>" + railName + "</td></tr>");

	});
	
});