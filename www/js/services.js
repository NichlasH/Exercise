angular.module('starter.services', [])

  .factory('Auth', function () {
    return firebase.auth();
  })

  .factory('Teachers', function ($firebaseArray) {
    var teacher = $firebaseArray(firebase.database().ref('Teachers'));
    var course = $firebaseArray(firebase.database().ref('Courses'));
    return {
      add: function (newTeacher) {
        var updates = {};
        var newId =
          firebase.database().ref().child('Teachers').push().key;
        updates['/Teachers/' + newId] = newTeacher;
        firebase.database().ref().update(updates);
      },
      all: function () {
        return course;
      },
      remove: function (course) {
        firebase.database().ref('Teachers/' + $id).remove();
      },
      get: function (teacherId) {
        for (var i = 0; i < teacher.length; i++) {
          if (teacher[i].$id === teacherId) {
            return teacher[i];
          }
        }
        return null;
      },
      addDiary: function (teacher) {
        var updates = {};
        var newId =
          firebase.database().ref().child('Teachers').push().ke
        y;
        updates['/Teachers/' + newId] = teacher;
        firebase.database().ref().update(updates);
      },
      getTeachers: function () {
        teacher.sort(compare);
        return teacher;
      }
    };
  });
