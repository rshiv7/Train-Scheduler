

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



var name = '';
var destination = '';
var firstTrainTime = '12:00';
var frequency = '';



$("#add-train").on("click", function () {
    event.preventDefault();


    name = $('#name-input').val().trim();
    destination = $('#destination-input').val().trim();
    firstTrainTime = $('#first-train-time-input').val().trim();
    frequency = $('#frequency-input').val().trim();


    // Code for the push
    dataRef.ref("traintime").push({
        name: name,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,

    });


    $('#name-input').val('');
    $('#destination-input').val('');
    $('#first-train-time-input').val('');
    $('#frequency-input').val('');


});


// I don't know where I'm messing up. It  recording in my firebase database but not appending.

// I used the exercises in class as the template but I don't know what's the exact issue.

dataRef.ref("traintime").on("child_added", function (childSnapshot) {

    var trainTimeKeep = childSnapshot.val();
    frequency = trainTimeKeep.frequency;

    var currentTime = moment();
    var trainDetail = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    var timeDiff = currentTime.diff(moment(trainDetail),
        'minutes');
    var parseNumb = parseInt(frequency)
    console.log(typeof (parseNumb))
    var timeRemaining = timeDiff % parseNumb
    var minutesTillTrain = parseNumb - timeRemaining;
    var parseNumber = parseInt(minutesTillTrain)
    console.log(parseNumber);
    console.log(typeof (minutesTillTrain))
    var nextTrainTime = currentTime.add(minutesTillTrain, "minutes").format("LT");



    $("#traintable").append("<tr><td class='move'> " + childSnapshot.val().name + "</td>" + "<hr>" + "<td class='move'>" + childSnapshot.val().destination + "</td>" + " <td class='move'>" + frequency + "</td>" + "<td class='move'>" + nextTrainTime + "</td> " + "<td>" + minutesTillTrain + "</td> </tr>");






    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code)
});



