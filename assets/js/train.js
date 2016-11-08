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
	console.log(startTime);
	console.log(frequency);
	
	//Time Math
// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(startTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % frequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
	
	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + railName + "</td><td>" + "<a href='https://developers.google.com/maps/documentation/javascript/tutorial'>" + trainID + "</a>" + "</td><td>" + destination + "</td><td>" + setTimeout + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

	});
	
});

// User Login

$('#signIn').on('click', function () { 
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/plus.login');

firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});

	// Triggers when the auth state change for instance when the user signs-in or signs-out.
firebase.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var userName = user.displayName;        // TODO(DEVELOPER): Get user's name.

    // Set the user's profile pic and name.
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // We load currently existing chant messages.
    this.loadMessages();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};
	
	
});