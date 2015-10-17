'use strict';

var blog = angular.module('blog', []);
var user;
var userConnected = true;


blog.controller('blogCtrl', ['$scope', function ($scope) {
    $scope.showArticle = true;
    $scope.editVar = true;

    $scope.numberArticles = 5;
    $scope.getNumber = function(num) {
      return new Array(num);   
    }

    $scope.login = function (){
      $scope.showLogin = true;
      $scope.showSignup = false;
      $scope.showArticle = false;
      $scope.commentOn = false;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = false;
    }
    $scope.signup = function (){
      $scope.showLogin = false;
      $scope.showSignup = true;
      $scope.showArticle = false;
      $scope.commentOn = false;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = false;
    }
    $scope.myAccount = function (){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = false;
      $scope.commentOn = false;
      $scope.showAccount = true;
      $scope.newArticle = false;
      $scope.settings = false;
    }
    $scope.editAccount = function(){
      $scope.editVar = false;
    }
    $scope.addAnArticle = function (){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = false;
      $scope.commentOn = false;
      $scope.showAccount = false;
      $scope.newArticle = true;
      $scope.settings = false;
    }
    $scope.managePublications = function (){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = false;
      $scope.commentOn = false;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = true;
    }
    $scope.openCommentForm = function(index){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = true;
      alert(index);
      /*var varShow = 'commentOn'+index;
      $scope.varShow = true;*/
      var nameElement = "addComment"+index;
      document.getElementById(nameElement).setAttribute('ng-show', true);
      debugger;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = false;
    }



    /*******************************************
    * GENERIC METHODS
    ********************************************/

    $scope.submitDialog = function(varShow, object){
        object = angular.copy(object);
        $scope.varShow = false;
    }

    $scope.cancelDialog = function(varShow){
        $scope.varShow = false;
        $scope.showArticle = true;
    }


    /*******************************************
    * METHODS NO GENERIC
    ********************************************/

    $scope.submitLoginForm = function(user){
       user = angular.copy(user);
       $scope.showLogin = false;
    }
    $scope.cancelLogin = function (){
      $scope.showLogin = false;
      $scope.showArticle = true;
    }

    $scope.submitSignupForm = function(newUser){
       user = angular.copy(newUser);
       $scope.showSignup = false;
    }
    $scope.cancelSignup = function (){
      $scope.showSignup = false;
      $scope.showArticle = true;
    }

    $scope.sendComment = function(newComment){
       comment = angular.copy(newComment);
       $scope.commentOn = false;
    }
    $scope.cancelComment = function (){
      $scope.commentOn = false;
      $scope.showArticle = true;
    }
    $scope.cancelMyAccount = function (){
      $scope.showAccount = false;
      $scope.editVar = true;
      $scope.showArticle = true;
    }

}]);

blog.controller('articleCtrl', ['$scope', function ($scope) {
    $scope.addFavorite = function(index){
      var nameElement = "favoriteIcon"+index;
      var element = document.getElementById(nameElement);
      var source = element.getAttribute("src");
      if(source == "public/img/icon/heart-outline.png"){        
       element.src = "public/img/icon/heart.png" ;
      }
      else{
        element.src = "public/img/icon/heart-outline.png" ;
      }
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
