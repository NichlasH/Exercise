angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})




.controller('FoodsCtrl', function($scope, $state, $ionicFilterBar, Foods) {
$scope.add = function(view){
$state.go(view);
}


  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

var filterBarInstance;
$scope.showFilterBar = function () {
filterBarInstance =
$ionicFilterBar.show({
items: $scope.foods,
update: function (filteredItems,
filterText) {
$scope.foods = filteredItems;
if (filterText) {
console.log(filterText);
}
}
});
};

  $scope.foods = Foods.all();
  $scope.remove = function(food) {
    Foods.remove(food);
  };
})


.controller('FoodDetailCtrl', function($scope, $stateParams, Foods) {
  $scope.food = Foods.get($stateParams.foodId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AddCtrl', function ($scope,
    $state, Foods){ 
    $scope.close=function() {
    $state.go('tab.foods');
  };
    $scope.foods = Foods.all();
    $scope.newFood = {
      id: $scope.foods.length,
      name: '',
      lastText: '',
      face: ''
    }
    $scope.confirm = function () {
      Foods.add($scope.newFood);
      $scope.close();
    };
    });