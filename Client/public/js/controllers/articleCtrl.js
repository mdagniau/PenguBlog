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