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

  //setup fields for data input
  
  //calculate when next train will arrive
  //prepend input to div
