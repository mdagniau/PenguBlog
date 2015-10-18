blog.controller('blogCtrl', function ($scope, $http) {
    $scope.showArticle = true; 
    $scope.userConnected = false;
    $scope.invite = true;
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

    $scope.signout = function(){
      $scope.userConnected = false;
      $scope.invite = true;
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
      $scope.commentOn = true;
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

    $scope.submitLoginForm = function(){
      var user = {   pseudo: $scope.user.pseudo,
                     password: $scope.user.password
      } 
      $http.post('http://localhost:8090/login', user).then(function(resp){
          $scope.userConnected = true;
          $scope.invite = false;
      });

      $scope.user.pseudo = "";
      $scope.user.password = ""; 
      $scope.showLogin = false;
      $scope.showArticle = true;
    }
    $scope.cancelLogin = function (){
      $scope.user.pseudo = "";
      $scope.user.password = ""; 
      $scope.showLogin = false;
      $scope.showArticle = true;
    }

    $scope.submitSignupForm = function(){
      var newUser = {  pseudo: $scope.newUser.pseudo,
                       firstName: $scope.newUser.firstname, 
                       lastName: $scope.newUser.lastname,
                       email: $scope.newUser.email,
                       password: $scope.newUser.password
      } 
      $http.post('http://localhost:8090/addUser', newUser).then(function(resp){
          
      });

      $scope.newUser.pseudo = "";
      $scope.newUser.firstname = ""; 
      $scope.newUser.lastname = "";
      $scope.newUser.email = "";
      $scope.newUser.password = "";
      $scope.showSignup = false;
      $scope.showArticle = true;
    }
    $scope.cancelSignup = function (){
      $scope.newUser.pseudo = "";
      $scope.newUser.firstname = ""; 
      $scope.newUser.lastname = "";
      $scope.newUser.email = "";
      $scope.newUser.password = "";
      $scope.showSignup = false;
      $scope.showArticle = true;
    }

    $scope.sendComment = function(){
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

})