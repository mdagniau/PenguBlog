blogESIEA.controller('articles', function($scope, $rootScope, $http)
{

  // Display articles
  // -----------------------------------------------------------
  $http.get('http://localhost:8000/displayArticle').then(function(response)
  {
    var allArticles = $scope.allArticles = [];


    if (response.data == "Fetch all articles - FAILED")
    {
      $rootScope.ServerInformation = {
        'divView': true,
        'iconViewOK': false,
        'iconViewNOK': true,
        'iconViewInfo': false,
        'label': 'ERROR - Fetch article in DB'
      };
    }
    else
    {
      if (response.data.length == 0)
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': false,
          'iconViewInfo': true,
          'label': 'No article available'
        };
      }
      else
      {
        for(cursorArticle = 0; cursorArticle < response.data.length; cursorArticle++)
        {
          $scope.allArticles.push(response.data[cursorArticle]);
        }
      }
    }
  });



  //---------------------------------------------------------------------------
  //  **

  // To add new article to the database
  // --------------------------------------------------------------------------
  $scope.addNewArticle = function()
  {
    // Create object newArticle
    // ------------------------------------------
    var newArticle = {
      title : $scope.titleArtcile,
      header : $scope.textHeader,
      content : $scope.textContent,
      author: $rootScope.InformationConnectUser.Pseudo
    }


    // Send object newArticle to the NODEJS Server
    // ----------------------------------------------------
    $http.post('http://localhost:8000/addNewArticle', newArticle).then(function(response)
    {
      // Deal with the response of the database
      // -------------------------------------------------------
      if(response.data == "Insert of new article - FAILED")
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': true,
          'iconViewInfo': false,
          'label': 'ERROR during publishing of the article, try again later'
        };
      }
      else
      {
        $scope.allArticles.push(response.data);

        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': true,
          'iconViewNOK': false,
          'iconViewInfo': false,
          'label': 'Your article has been published now, thank you :)'
        };
      }

    });

  }



  //---------------------------------------------------------------------------
  //  **

  // Show div of the artcile's author, then he can do action on it
  // --------------------------------------------------------------------------
  $scope.isUserConnectAuthor = function(author, userConnect)
  {
    if(author == userConnect)
    {
      return true;
    }
    else
    {
      return false;
    }
  }



  //---------------------------------------------------------------------------
  //  **

  // Show div of the artcile's author, then he can do action on it
  // --------------------------------------------------------------------------
  $scope.deleteArticle = function(idArticle)
  {
    // Send the Thum Up to the NODEJS Server - to add Thumb
    // ----------------------------------------------------
    $http.post('http://localhost:8000/deleteArticle', {idArticle}).then(function(response)
    {
      // Deal with the response of the server
      // ---------------------------------------------

      // Update information
      // -------------------------------------
      $scope.allArticles = response.data

    });

  }



  //---------------------------------------------------------------------------
  //  **

  // To Thumb up an article
  // --------------------------------------------------------------------------
  $scope.articleThumbUp = function(informationsArticle)
  {
    // Send the Thum Up to the NODEJS Server - to add Thumb
    // ----------------------------------------------------
    $http.post('http://localhost:8000/thumbUp', {informationsArticle}).then(function(response)
    {
      // Deal with the response of the server
      // ---------------------------------------------

      // Update information
      // -------------------------------------
      $scope.allArticles = response.data
    });

  }


  //---------------------------------------------------------------------------
  //  **

  // To Thumb down an article
  // --------------------------------------------------------------------------
  $scope.articleThumbDown = function(informationsArticle)
  {
    // Send the Thum Up to the NODEJS Server - to minus Thumb
    // ----------------------------------------------------
    $http.post('http://localhost:8000/thumbDown', {informationsArticle}).then(function(response)
    {
      // Deal with the response of the server
      // ---------------------------------------------

      // Update information
      // -------------------------------------
      $scope.allArticles = response.data
    });

  }



  $scope.addNewComment = function(idArticles)
  {
    console.log("bonour");
  }
})
