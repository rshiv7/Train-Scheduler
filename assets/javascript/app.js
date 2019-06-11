

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDAY6J4BkKXuYGhN3wxuV9Vb2ITYpvkNQs",
    authDomain: "train-scheduler-95f65.firebaseapp.com",
    databaseURL: "https://train-scheduler-95f65.firebaseio.com",
    projectId: "train-scheduler-95f65",
    storageBucket: "train-scheduler-95f65.appspot.com",
    messagingSenderId: "866918494606",
    appId: "1:866918494606:web:d6d5b649017b6eb0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var dataRef = firebase.database();



var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';




$(document).ready(function() {

     $("#add-train").on("click", function() {
        event.preventDefault();
     	
     	
     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-train-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	// Code for the push
     	dataRef.ref().push({
     		name: name,
     		destination: destination,
     		firstTrainTime: firstTrainTime,  
     		frequency: frequency,
               nextTrainFormatted: nextTrainFormatted,
               minutesTillTrain: minutesTillTrain
     	});
          

          $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#first-train-time-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });
          

// I don't know where I'm messing up. It is not recording in my firebase database.
// I used the exercises in class as the template but I don't know what's the exact issue.

     dataRef.ref().on("child_added", function(childSnapshot) {
	

		$('.train-schedule').append("<tr class='table-row' id=" + "'" + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + 
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + 
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");
// Handle the errors
}, function(errorObject){
	//console.log("Errors handled: " + errorObject.code)
});

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.ref().child(getKey).remove();
});

}); // Closes jQuery wrapper
