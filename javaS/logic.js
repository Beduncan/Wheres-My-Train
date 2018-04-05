$(document).ready(function(){

  var config = {
    apiKey: "AIzaSyCFnfWaUWNfYG5HYLZTfv_IDKW74RKdbQI",
    authDomain: "train-schedule-8ead4.firebaseapp.com",
    databaseURL: "https://train-schedule-8ead4.firebaseio.com",
    projectId: "train-schedule-8ead4",
    storageBucket: "train-schedule-8ead4.appspot.com",
    messagingSenderId: "545758589419"
  };
  
  firebase.initializeApp(config);
//var for database
  var database = firebase.database();

  $("#add-user").on("click", function() {
    event.preventDefault();

    var Trainname = $("#train-input").val().trim();
    var Destination = $("#destination-input").val().trim();
    var Frequency = $("#frequency-input").val().trim();
    var Firsttrain = $("#firsttrain-input").val().trim();

         
        console.log(Trainname);
        console.log(Destination);
        console.log(Frequency);
        console.log(Firsttrain); 

      database.ref().push({
        Trainname: Trainname,
        Destination: Destination,
        Frequency: Frequency,
        Firsttrain: Firsttrain,
      });
  });
//firebase watcher 
    database.ref().on("child_added", function(snapshot) {
    	console.log(snapshot.val());
      
      var Trianname = (snapshot.val().Trainname);
      var Destination = (snapshot.val().Destination);
      var Firsttrain = (snapshot.val().Firsttrain);
      var Frequency = (snapshot.val().Frequency);

//geting current time
var RN = $.now();
var time = (moment(RN).format("HH:mm"));
console.log(time);
//convert time of varible
var Convertedtime = moment(Firsttrain, "HH:mm").subtract(1, "years");
//converting time to minutes with .diff
var difftime = moment().diff(moment(Convertedtime), "minutes");
//
var Rtime = difftime % Frequency;
console.log(Rtime);
//subtacts Frequecy from remaining time 
var Nextarrival = Frequency - Rtime;
console.log(Nextarrival);
//puting time back in HH:mm format atfer turning it back to minutes 
Nexttrian = moment().add(Nextarrival, "minutes").format("HH:mm");
console.log(Nexttrian);

$("#traintable").append("<tr id='table'><td id = 'trainname'>" 
	+ snapshot.val().Trainname + "</td><td id = 'Destination'> " +
	snapshot.val().Destination + "</td><td id = 'Frequency'> " + 
	snapshot.val().Frequency + "</td><td id= 'nextarrival'>" +
	Nexttrian + "</td><td id= 'minaway'>" + Nextarrival + "<td></tr>");
});
//close ready
});