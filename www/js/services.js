angular.module('starter.services', [])

  .factory('Auth', function () {
    return firebase.auth();
  })

  .factory('Courses', function ($firebaseArray) {
    var teacher = $firebaseArray(firebase.database().ref('Teachers'));
    var course = $firebaseArray(firebase.database().ref('Courses'));
    return {
      add: function (newCourse) {
        var updates = {};
        var newId =
          firebase.database().ref().child('Courses').push().key;
        updates['/Courses/' + newId] = newCourse;
        firebase.database().ref().update(updates);
      },
      all: function () {
        return course;
      },
      remove: function (course) {
        firebase.database().ref('Courses/' + $id).remove();
      },
      get: function (courseId) {
        for (var i = 0; i < Courses.length; i++) {
          if (Courses[i].$id === courseId) {
            return Courses[i];
          }
        }
        return null;
      },
      addDiary: function (diary) {
        var updates = {};
        var newId =
          firebase.database().ref().child('diaries').push().ke
        y;
        updates['/diaries/' + newId] = diary;
        firebase.database().ref().update(updates);
      },
      getDiaries: function () {
        diaries.sort(compare);
        return diaries;
      }
    };
  });
