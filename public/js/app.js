'use strict';

var blog = angular.module('blog', []);
var user;

blog.controller('blogCtrl', ['$scope', function ($scope) {
    $scope.login = function (){
      $scope.showLogin = true;
    }
    $scope.signup = function (){
      $scope.showSignup = true;
    }
    $scope.openCommentForm = function(){
      $scope.commentOn = true;
    }
}]);

blog.controller('loginCtrl', ['$scope', function ($scope) {
    $scope.submitLoginForm = function(user){
       user = angular.copy(user);
       $scope.showLogin = false;
    }
    $scope.cancelLogin = function (){
      $scope.showLogin = false;
    }
}]);

blog.controller('signupCtrl', ['$scope', function ($scope) {
    $scope.submitSignupForm = function(newUser){
       user = angular.copy(newUser);
       $scope.showSignup = false;
    }
    $scope.cancelSignup = function (){
      $scope.showSignup = false;
    }
}]);

blog.controller('commenttrl', ['$scope', function ($scope) {
    $scope.sendComment = function(newComment){
       comment = angular.copy(newComment);
       $scope.commentOn = false;
    }
    $scope.cancelSignup = function (){
      $scope.commentOn = false;
    }
}]);


blog.controller('helloCtrl', ['$scope', function ($scope) {
   $scope.name = 'Nico';
}]);

blog.controller('peopleCtrl', ['$scope', function ($scope) {
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



/*Simple JS*/
