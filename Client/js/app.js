var helloApp = angular.module('helloApp', []);

helloApp.controller('helloCtrl', ['$scope', function ($scope) {
	 $scope.name = 'Nico';
}]);

helloApp.controller('peopleCtrl', ['$scope', function ($scope) {
  $scope.people = [
    { "firstname": "Martin", "lastname": "Catty" },
    { "firstname": "Nicolas", "lastname": "Cavigneaux" },
    { "firstname": "Nicolas", "lastname": "Zermati" },
    { "firstname": "Victor", "lastname": "Darras" },
    { "firstname": "Jonathan", "lastname": "François" },
    { "firstname": "Numa", "lastname": "Claudel" }
  ];

  $scope.showPeople = true;
}]);