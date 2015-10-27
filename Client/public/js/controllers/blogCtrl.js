blog.controller('blogCtrl', function ($scope, $http) {
    $scope.showArticle = true; 
    $scope.userConnected = false;
    $scope.invite = true;
    $scope.editVar = true;
    var articlesByUser;

    $http({
      method : 'get',
      url :'http://localhost:8090/getArticles'
    }).then(function(resp){
        $scope.numberArticles = resp.data.rowCount;
        for (var i = 0; i < resp.data.rowCount; i++) {
          var getTitle = document.getElementById("titleArticle"+i);
          var getBody = document.getElementById("bodyArticle"+i);
          var newTitle = resp.data.rows[i].title;
          var newBody = resp.data.rows[i].body; 
          getTitle.innerText = newTitle;
          getBody.innerText = newBody;
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
      $scope.user.pseudo = "";
      $scope.user.lastname = "";
      $scope.user.firstname = "";
      $scope.user.email = "";
      $scope.user.password = "";
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
    $scope.addAnArticle = function(){
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
    $scope.openCommentByArticle = function(index){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = true;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = false;
      document.getElementById("comment"+index).style.display = 'table';
    }
    $scope.openCommentForm = function(index){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = true;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = false;
      document.getElementById("addComment"+index).style.display = 'table';
      document.getElementById("addComment"+index).style.marginBottom = '10em';
    }


    /*******************************************
    * METHODS LOGIN/LOGOUT/SIGNUP
    ********************************************/

    $scope.submitLoginForm = function(){
      var user = {   pseudo: $scope.user.pseudo,
                     password: $scope.user.password
      } 
      $http.post('http://localhost:8090/login', user).then(function(resp){
        if(resp != null){
          document.getElementById("userPseudo").innerHTML = resp.data.rows[0].pseudo;
          $scope.user.pseudo = resp.data.rows[0].pseudo;
          $scope.user.lastname = resp.data.rows[0].lastname;
          $scope.user.firstname = resp.data.rows[0].firstname;
          $scope.user.email = resp.data.rows[0].email;
          $scope.user.password = resp.data.rows[0].password;
          getArticlesByUser();
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


    /*******************************************
    * METHODS ARTICLES
    ********************************************/

    getArticlesByUser = function(){
      var author = {pseudo: $scope.user.pseudo};
      $http.post('http://localhost:8090/getArticlesByUser', author).then(function(resp){   
        $scope.numberArticlesByUser = resp.data.rowCount;
        for(var i=0; i<resp.data.rowCount; i++)
        {
          document.getElementById("publication"+i).innerHTML = resp.data.rows[i].title;
        }
        return resp.data;
      });
    }

    /*$scope.updateArticle = function(index){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = false;
      $scope.showAccount = false;
      $scope.newArticle = true;
      $scope.settings = false;     
    }*/

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
      var newArticle = {  title: $scope.newArticle.title,
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


    /*******************************************
    * METHODS COMMENTS
    ********************************************/

    $scope.getCommentsByArticle = function(index){
      var article = { article : index }
       $http.post('http://localhost:8090/getCommentsByArticle', article).then(function(resp){   
        });
    }

    $scope.submitCommentForm = function(index){
       var newComment = { bodyComment : $scope.bodyComment,
                          author : $scope.user.pseudo,
                          article : index
       }
       $http.post('http://localhost:8090/addComment', newComment).then(function(resp){   
        });
       document.getElementById("addComment"+index).style.display = 'none';
       $scope.showArticle = true;
    }
    $scope.cancelComment = function (index){
      $scope.showArticle = true;
      document.getElementById("addComment"+index).style.display = 'none';
    }
    $scope.cancelMyAccount = function (){
      $scope.showAccount = false;
      $scope.editVar = true;
      $scope.showArticle = true;
    }


    /*******************************************
    * METHODS ACCOUNT
    ********************************************/

    $scope.submitMyAccountChanges = function(){
       var userChanged = {  pseudo: $scope.user.pseudo,
                            firstName: $scope.user.firstname, 
                            lastName: $scope.user.lastname,
                            email: $scope.user.email,
                            password: $scope.user.password
        } 
        $http.post('http://localhost:8090/updateUser', userChanged).then(function(resp){   
        });
      $scope.editVar = true;        
      $scope.showAccount = false;
      $scope.showArticle = true;
    }
})