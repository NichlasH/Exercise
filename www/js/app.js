// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// app.js
angular.module('starter', ['ionic', 'ngCordova', 'firebase', 'chart.js', 'jett.ionic.filter.bar', 'starter.controllers', 'starter.services'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


.state('login', {
url: '/login',
templateUrl: 'templates/login.html',
controller: 'LoginCtrl'
})
// the fallback function below should be added at the end of the state definion


  // setup an abstract state for the tabs directive
.state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.institute', {
    url: '/institute',
    views: {
      'tab-institute': {
        templateUrl: 'templates/tab-institute.html',
        controller: 'InstituteCtrl'
      }
    }
  })

  .state('tab.courses', {
      url: '/courses',
      views: {
        'tab-courses': {
          templateUrl: 'templates/tab-courses.html',
          controller: 'CoursesCtrl'
        }
      }
    })
    .state('tab.add', {
      url: '/add',
      views: {
        'tab-courses': {
          templateUrl: 'templates/tab-add.html',
          controller: 'AddCtrl'
        }
      }
    })
    
    .state('tab.teacher-detail', {
      url: '/teachers/:id',
      views: {
        'tab-teachers': {
          templateUrl: 'templates/teacher-detail.html',
          controller: 'TeacherDetailCtrl'
        }
      }
    })

  .state('tab.teachers', {
    url: '/teachers',
    views: {
      'tab-teachers': {
        templateUrl: 'templates/tab-teachers.html',
        controller: 'TeachersCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
  

});
