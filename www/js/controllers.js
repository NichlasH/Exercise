angular.module('starter.controllers', [])

  .controller('InstituteCtrl', function ($scope, $timeout) {
    // $scope.plotData = Courses.getPlotData();

    // $scope.refreshDiaries = function () {
    // $timeout(function () {
    // $scope.plotData = Courses.getPlotData();
    //$scope.$broadcast('scroll.refreshComplete');
    //}, 1000);
    // };
  })

  .controller('CoursesCtrl', function ($scope, $state, $timeout, $ionicFilterBar, $ionicPopup) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    var filterBarInstance;



    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.courses,
        update: function (filteredItems, filterText) {
          $scope.courses = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };
    $scope.add = function (view) {
      $state.go(view);
    }
    $scope.showPopup = function (food) {
      $scope.newDiary = {
        id: $scope.Teachers.length,
        teahcer: {
          id: Teachers.$id,
          name: Teachers.name,
          img: Teachers.img
        }
      };

      $scope.refreshCourses = function () {
        if (filterBarInstance) {
          filterBarInstance();
          filterBarInstance = null;
        }

        $timeout(function () {
          $scope.courses = Courses.all();
          $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
      };


      $scope.data = {};
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        templateUrl: 'templates/courses-popup.html',
        title: 'Make a Calories Diary',
        subTitle: 'How Many Ozs and When did you eat ' + food.name,
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Confirm</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.amount || !$scope.data.date || !$scope.data.time) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                var datetime = $scope.data.date.getFullYear() + '-'
                  + ("0" + ($scope.data.date.getMonth() + 1)).slice(-2) + '-'
                  + ("0" + $scope.data.date.getDate()).slice(-2) + 'T'
                  + ("0" + $scope.data.time.getHours()).slice(-2) + ':'
                  + ("0" + $scope.data.time.getMinutes()).slice(-2) + ':'
                  + ("0" + $scope.data.time.getSeconds()).slice(-2);

                $scope.newDiary.amount = $scope.data.amount;
                $scope.newDiary.date = datetime;
                Courses.addDiary($scope.newDiary);
                return $scope.data;
              }
            }
          }
        ]
      });
    }


  })

  .controller('AddCtrl', function ($scope, $state, $cordovaCamera, Courses) {
    $scope.courses = Courses.all();
    $scope.newFood = {
      id: $scope.courses.length,
      name: '',
      lastText: '',
      face: ''
    };

    $scope.confirm = function () {
      Courses.add($scope.newFood);
      $scope.close();
    };

    $scope.close = function () {
      $state.go('tab.courses');
    };
  })

  .controller('TeacherDetailCtrl', function ($scope, $state, $stateParams, Teachers) {
 $scope.$on('$ionicView.enter', function(e) {
   $scope.detail = Teachers.getdetail();
   console.log($scope.detail)

    
  
   
 })
    
  })

 

  .controller('LoginCtrl', function ($scope, $state,
    $ionicPopup, Auth) {
    $scope.data = {};
    $scope.login = function () {
      Auth.signInWithEmailAndPassword($scope.data.email,
        $scope.data.password)
        .then(function (authData) {
          $state.go('tab.institute');
        }).catch(function (error) {
          console.log(error);
          var alertPopup = $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
          });
        });
    };
  })

  .controller('TeachersCtrl', function ($scope, $rootScope, Auth, $state, Teachers) {
    $scope.teachers = Teachers.all();
    
    
    $scope.click = function(teacher) {
      Teachers.setdetail(teacher);
      $state.go('tab.teacher-detail')
    }
  });