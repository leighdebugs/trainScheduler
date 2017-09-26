//set up firebase

  var config = {
    apiKey: "AIzaSyCIq6iTzUQpZ0y_e8raGRu2gfERuXRZSMk",
    authDomain: "trainscheduler-a6b38.firebaseapp.com",
    databaseURL: "https://trainscheduler-a6b38.firebaseio.com",
    projectId: "trainscheduler-a6b38",
    storageBucket: "",
    messagingSenderId: "372305213618"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //submit button captures user input
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //set variables for user input
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment ($("#time-input").val().trim(), "hh:mm").subtract(1, "years");
    var trainFreq = $("#frequency-input").val().trim();  

    //create temporary object to hold user input
    var newTrain = {
      name: trainName,
      dest: trainDest,
      time: trainTime
      freq: trainFreq
    };

    database.ref().push(newTrain);

    //log to console for confirmation
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(trainFreq.freq);
  });
  
  //calculate when next train will arrive
  //prepend input to div
