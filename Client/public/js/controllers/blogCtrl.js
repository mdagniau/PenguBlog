blog.controller('blogCtrl', function ($scope, $http) {
    $scope.showArticle = true; 
    $scope.userConnected = false;
    $scope.invite = true;
    $scope.editVar = true;

    $http({
      method : 'get',
      url :'http://localhost:8090/getArticles'
    }).then(function(resp){
        $scope.numberArticles = resp.data.rowCount;
        for (var i = resp.data.rowCount - 1; i >= 0; i--) {
          var getTitle = "titleArticle"+i;
          var newTitle = resp.data.rows[i].title;
          var newBody = resp.data.rows[i].body; 
          document.getElementById(getTitle).innerHTML = newTitle;
          debugger;
          document.getElementById("bodyArticle"+i).innerHTML = newBody;
        };
    });

    $scope.getNumber = function(num) {
      return new Array(num);   
    }

    $scope.login = function (){
      $scope.showLogin = true;
      $scope.showSignup = false;
      $scope.showArticle = false;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = false;
    }
    $scope.signup = function (){
      $scope.showLogin = false;
      $scope.showSignup = true;
      $scope.showArticle = false;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = false;
    }

    $scope.signout = function(){
      $scope.userConnected = false;
      $scope.invite = true;
      document.getElementById("userPseudo").innerHTML = "Pengu name";
    }

    $scope.myAccount = function (){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = false;
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
      $scope.showAccount = false;
      $scope.newArticle = true;
      $scope.settings = false;
    }
    $scope.managePublications = function (){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = false;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = true;
    }
    $scope.openCommentForm = function(index){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = true;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = false;
      document.getElementById("addComment"+index).style.display = 'block';
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
        if(resp != null){
          document.getElementById("userPseudo").innerHTML = resp.data.rows[0].pseudo;
          $scope.userConnected = true;
          $scope.invite = false;
        }
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
      if ($scope.signupForm.$valid) {

        var newUser = {  pseudo: $scope.newUser.pseudo,
                         firstName: $scope.newUser.firstname, 
                         lastName: $scope.newUser.lastname,
                         email: $scope.newUser.email,
                         password: $scope.newUser.password
        } 
        $http.post('http://localhost:8090/addUser', newUser).then(function(resp){   
        });
      }

      $scope.newUser.pseudo = "";
      $scope.newUser.firstname = ""; 
      $scope.newUser.lastname = "";
      $scope.newUser.email = "";
      $scope.newUser.password = "";
      $scope.newUser.confirmPassword = "";
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
    $scope.cancelComment = function (index){
      $scope.commentOn = false;
      $scope.showArticle = true;
      document.getElementById("addComment"+index).style.display = 'none';
    }
    $scope.cancelMyAccount = function (){
      $scope.showAccount = false;
      $scope.editVar = true;
      $scope.showArticle = true;
    }

    /*Articles*/
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

    $scope.sendArticle = function(){
      var newArticle = { title: $scope.newArticle.title,
                          body: $scope.newArticle.body
      } 
      $http.post('http://localhost:8090/addArticle', newArticle).then(function(resp){
          
      });

      $scope.newArticle.title = "";
      $scope.newArticle.body = ""; 
      $scope.newArticle = false;
      $scope.showArticle = true;
    }

    $scope.cancelNewArticle = function(){
      $scope.newArticle.title = "";
      $scope.newArticle.body = ""; 
      $scope.newArticle = false;
      $scope.showArticle = true;
    }

    /*Comments*/

})