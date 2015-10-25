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
}]);