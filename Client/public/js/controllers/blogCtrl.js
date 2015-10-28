blog.controller('blogCtrl', function ($scope, $http) {
    $scope.showArticle = true; 
    $scope.userConnected = false;
    $scope.invite = true;
    $scope.editVar = true;
    $scope.listFavoriteByUser = null;

    $http({
      method : 'get',
      url :'http://localhost:8090/getArticles'
    }).then(function(resp){
        $scope.listArticles = resp.data.rows;
        for(var i=0; i<resp.data.rowCount; i++){
          $scope.listArticles[i].date = ((new Date(Number(1000*resp.data.rows[i].date))).toString()).split("GMT", 1);     
        }
    });

    $scope.login = function (){
      $scope.showLogin = true;
      $scope.showSignup = false;
      $scope.showArticle = false;
      $scope.showAccount = false;
      $scope.newArticle = false;
    }
    $scope.signup = function (){
      $scope.showLogin = false;
      $scope.showSignup = true;
      $scope.showArticle = false;
      $scope.showAccount = false;
      $scope.newArticle = false;
    }

    $scope.signout = function(){
      $scope.userConnected = false;
      $scope.invite = true;
      $scope.user.pseudo = "";
      $scope.user.lastname = "";
      $scope.user.firstname = "";
      $scope.user.email = "";
      $scope.user.password = "";
      document.getElementById("userPseudo").innerText = "Pengu name";
    }

    $scope.myAccount = function (){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = false;
      $scope.showAccount = true;
      $scope.newArticle = false;
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
    }
    $scope.openCommentForm = function(index){
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = true;
      $scope.showAccount = false;
      $scope.newArticle = false;
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
          document.getElementById("userPseudo").innerText = resp.data.rows[0].pseudo;
          $scope.user.pseudo = resp.data.rows[0].pseudo;
          $scope.user.lastname = resp.data.rows[0].lastname;
          $scope.user.firstname = resp.data.rows[0].firstname;
          $scope.user.email = resp.data.rows[0].email;
          $scope.user.password = resp.data.rows[0].password;
          getFavoriteArticles();
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
          $scope.showSignup = false;
          $scope.showArticle = true;
          $scope.newUser.pseudo = "";
          $scope.newUser.firstname = ""; 
          $scope.newUser.lastname = "";
          $scope.newUser.email = "";
          $scope.newUser.password = "";
          $scope.newUser.confirmPassword = "";  
        });
      }



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
        $scope.listArticlesByUser = resp.data.rows;
      });
    }

    getFavoriteArticles = function(){
      var user = {pseudo: $scope.user.pseudo};
      $http.post('http://localhost:8090/getFavoritesByUser', user).then(function(resp){   
        $scope.listFavoriteByUser = resp.data.rows;
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
      var favorite = {  pseudo : $scope.user.pseudo,
                        article : index }
      if(source == "public/img/icon/heart-outline.png"){
        $http.post('http://localhost:8090/addFavorite', favorite).then(function(resp){        
          element.src = "public/img/icon/heart.png" ;
        });
      }
      else{
        $http.post('http://localhost:8090/deleteFavorite', favorite).then(function(resp){
          element.src = "public/img/icon/heart-outline.png" ;
        });
      }
    }

    $scope.sendArticle = function(){
      var newArticle = {  title: $scope.newArticleByUser.title,
                          body: $scope.newArticleByUser.body,
                          author: $scope.user.pseudo,
                          date: Math.floor((Date.now())/1000)
      } 
      $http.post('http://localhost:8090/addArticle', newArticle).then(function(resp){
          getArticles();
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

    $scope.deleteArticle = function(index){
      var articleDeleted = {  idArticle: index} 
       if (confirm("Are you sure you want to delete this article?")) { 
        $http.post('http://localhost:8090/deleteArticle', articleDeleted).then(function(resp){   
        });
        $scope.editVar = true;
        $scope.userConnected = true;
        $scope.invite = false;       
        $scope.showAccount = false;
        $scope.showArticle = true;
        getArticles();
       }
    }


    /*******************************************
    * METHODS COMMENTS
    ********************************************/

    $scope.getCommentsByArticle = function(index){
      var article = { article : index }
       $http.post('http://localhost:8090/getCommentsByArticle', article).then(function(resp){
        $scope.listComments = resp.data.rows;
        for(var i=0; i<resp.data.rowCount; i++){
          $scope.listComments[i].date_creation = ((new Date(Number(1000*resp.data.rows[i].date_creation))).toString()).split("GMT", 1);     
        }
      });
      $scope.showLogin = false;
      $scope.showSignup = false;
      $scope.showArticle = true;
      $scope.showAccount = false;
      $scope.newArticle = false;
      $scope.settings = false;
    }

    $scope.submitCommentForm = function(index){
       var newComment = { bodyComment : $scope.bodyComment,
                          author : $scope.user.pseudo,
                          article : index,
                          date: Math.floor((Date.now())/1000)
       }
       $http.post('http://localhost:8090/addComment', newComment).then(function(resp){   
        });
       $scope.bodyComment="";
       document.getElementById("addComment"+index).style.display = 'none';
       $scope.showArticle = true;
    }

    $scope.cancelComment = function (index){
      $scope.showArticle = true;
      document.getElementById("addComment"+index).style.display = 'none';
    }

    $scope.deleteComment = function(index){
      var commentDeleted = {  idComment: index} 
      debugger;
       if (confirm("Are you sure you want to delete this comment?")) { 
        $http.post('http://localhost:8090/deleteComment', commentDeleted).then(function(resp){   
        });
        $scope.editVar = true;
        $scope.userConnected = true;
        $scope.invite = false;       
        $scope.showAccount = false;
        $scope.showArticle = true;
      }
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

    $scope.deleteAccount = function(){
      var userDeleted = {  pseudo: $scope.user.pseudo} 
       if (confirm("Are you sure you want to delete your account?")) { 
        $http.post('http://localhost:8090/deleteUser', userDeleted).then(function(resp){   
        });
        $scope.user.pseudo ="";
        $scope.user.password ="";
        $scope.editVar = true;
        $scope.userConnected = false;
        $scope.invite = true;       
        $scope.showAccount = false;
        $scope.showArticle = true;
       }
    }

    $scope.cancelMyAccount = function (){
      $scope.showAccount = false;
      $scope.editVar = true;
      $scope.showArticle = true;
    }
})