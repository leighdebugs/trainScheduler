// Initialize Firebase
var config = {
  apiKey: "AIzaSyAfeXYdvL_N7DeeXCU3CbecfrOfGJjUNV8",
  authDomain: "trainscheduleupdate.firebaseapp.com",
  databaseURL: "https://trainscheduleupdate.firebaseio.com",
  projectId: "trainscheduleupdate",
  storageBucket: "",
  messagingSenderId: "841519492614"
};
firebase.initializeApp(config);


var database = firebase.database();

//submit button captures user input
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  //set variables for user input
  var trainName = $("#name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = $("#time-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();  

  //create temporary object to hold user input
  var newTrain = {
    name: trainName,
    dest: trainDest,
    time: trainTime,
    freq: trainFreq,
  };

  database.ref().push(newTrain);

  //log to console for confirmation
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.time);
  console.log(newTrain.freq);

  //clear text-boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

});

//Firebase event for adding new train to database and HTML
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  //store values in variables
  var trainName = childSnapshot.val().name
  var trainDest = childSnapshot.val().dest
  var trainTime = childSnapshot.val().time
  var trainFreq = childSnapshot.val().freq

  //log to console for confirmation
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  //calculate minutes until next train
  var trainTimeConv = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log(trainTimeConv);

  var currentTime = moment();
  console.log("Current Time: " + moment(currentTime).format("HH:mm"));
  
  var timeDiff = moment().diff(moment(trainTimeConv), "minutes");
  console.log("Difference in time: " + timeDiff);

  var tRemainder = timeDiff % trainFreq;
  console.log(tRemainder);

  var minTillTrain = trainFreq - tRemainder;
  console.log("Minutes till train: " + minTillTrain);

  //calculate time of next train
  var nextTrain = moment().add(minTillTrain, "minutes").format("HH:mm");
  console.log("Arrival Time: " + nextTrain);

    // Add each train's data into the table
  $("#current-schedule > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextTrain + "</td><td>" + minTillTrain + "</td></tr>");


});