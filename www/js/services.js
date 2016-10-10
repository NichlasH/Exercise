angular.module('starter.services', [])

  .factory('Auth', function () {
    return firebase.auth();
  })

  .factory('Foods', function ($firebaseArray) {
    var foods = $firebaseArray(firebase.database().ref('foods'));
    var diaries = $firebaseArray(firebase.database().ref('diaries'));

    function compare(a, b) {
      var d1 = new Date(a.date);
      var d2 = new Date(b.date);
      if (d1.getTime() < d2.getTime())
        return -1;
      if (d1.getTime() > d2.getTime())
        return 1;
      return 0;
    }

    function createPlotData(diaries) {
      var startDate = new Date(diaries[0].date.split('T')[0]);
      var endtDate = new Date(diaries[diaries.length - 1].date.split('T')[0]);
      var counter = 0;

      var plotData = {
        labels: [],
        series: ['Intake'],
        data: []
      };
      while (startDate.getTime() <= endtDate.getTime()) {
        var currentDate = new Date(diaries[counter].date);
        var tmp = 0;
        var timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
        var diffDays = timeDiff / (1000 * 3600 * 24);

        plotData.labels.push(startDate.toDateString());
        if (currentDate.getTime() > startDate.getTime() && diffDays >= 1) {
          plotData.data.push(0);
          startDate.setDate(startDate.getDate() + 1);
          continue;
        }
        while (diffDays < 1) {
          tmp += parseFloat(diaries[counter].amount) * parseInt(diaries[counter].food.calories);
          counter += 1;
          if (counter >= diaries.length) {
            break;
          }
          currentDate = new Date(diaries[counter].date);
          timeDiff = Math.abs(currentDate.getTime() - startDate.getTime());
          diffDays = timeDiff / (1000 * 3600 * 24);
        }
        plotData.data.push(tmp);
        startDate.setDate(startDate.getDate() + 1);
      }
      return plotData;
    }


    return {
      aadd: function (newFood) {
        var updates = {};
        var newId =
          firebase.database().ref().child('foods').push().key;
        updates['/foods/' + newId] = food;
        firebase.database().ref().update(updates);
      },
      remove: function (food) {
        firebase.database().ref('foods/' + food.$id).remove();
      },
      get: function (foodId) {
        for (var i = 0; i < foods.length; i++) {
          if (foods[i].$id === foodId) {
            return foods[i];
          }
        }
        return null;
      },
      getPlotData: function (diariesArray) {
        diariesArray.sort(compare);
        return createPlotData(diariesArray);
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
