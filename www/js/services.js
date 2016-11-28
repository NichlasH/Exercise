angular.module('starter.services', [])

  .factory('Auth', function () {
var config = {
    apiKey: "AIzaSyBnAtAsQwwP6qqhdpbfHn4wNj8QFZWc77E",
    authDomain: "exercise-1-1ab4a.firebaseapp.com",
    databaseURL: "https://exercise-1-1ab4a.firebaseio.com",
    storageBucket: "exercise-1-1ab4a.appspot.com",
    messagingSenderId: "14506711281"
  };
  firebase.initializeApp(config);
    return firebase.auth();
  })


  .factory('Teachers', function ($firebaseArray) {
    var teacher = $firebaseArray(firebase.database().ref('Teachers'));
    var course = $firebaseArray(firebase.database().ref('Courses'));
    var detail;
    return {
        all: function() {
            return teacher;
        },
        get: function(id) {
            // Simple index lookup
            return teacher[id];
        },       
        setdetail: function(details)  {
          detail = details;
        }, 
        getdetail: function() {
          return detail;
        }
      
    
  
}

})
