/* **
  **  **  **
    ______________________________________
    ANGULAR JS - Directive
    ______________________________________

  **  **  **
** */



/* **
  **  **  **
    ______________________________________
    ANGULAR JS - Controller
    ______________________________________

  **  **  **
** */
blogESIEA.controller('users', function($scope, $rootScope, $http)
{

  //---------------------------------------------------------------------------
  //  **

  // in the form "formAdduser"
  // Check if the pseudo already exist in the database
  // Each pseudo have to be unique
  // --------------------------------------------------------------------------
  $scope.checkPseudo = function(PseudoToCheck)
  {
    console.log(PseudoToCheck);
    /*$http.post('http://localhost:8000/checkPseudo', {PseudoToCheck}).then(function(response)
    {
      console.log(response.data);
      // Deal with the response of the NODE JS server
      // ------------------------------------------------------
      /*if(response.data == true)
      {
        // There's already a pseudo
        return true;
      }
      else
      {
        // It's a new pseudo
        return false;
      }

    });*/
  }


  //---------------------------------------------------------------------------
  //  **

  // in the form "formAdduser"
  // Check if the password and it comfirmation are identical
  // --------------------------------------------------------------------------
  $scope.checkComfirmPassword = function(string1, string2)
  {
    if(string1 != string2)
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

  // To add a User in the mongo DataBase
  // --------------------------------------------------------------------------
  $scope.addUser = function()
  {

    // Creation of objet 'user' with all caracteristics
    // --------------------------------
    var newUser = {
      Firstname : $scope.Firstname,
      Lastname : $scope.Lastname,
      Pseudo : $scope.Pseudo,
      Email : $scope.Email,
      Password : $scope.Password
    };


    // Send object 'user' to the NODE server
    // ------------------------------------------------------
    $http.post('http://localhost:8000/addUser', newUser).then(function(response)
    {
      // Deal with the response of the server
      // ---------------------------------------------------
      if(response.data == "Insert of new user - FAILED")
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': true,
          'iconViewInfo': false,
          'label': 'ERROR during the inscription, try again later'
        };
      }
      else
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'divConnect': true,
          'iconViewOK': true,
          'iconViewNOK': false,
          'iconViewInfo': false,
          'label': 'Welcome to the ESIEA Blog'
        };

        $rootScope.InformationConnectUser =  {
          'Firstname': response.data.Firstname,
          'Lastname': response.data.Lastname,
          'Email': response.data.Email,
          'Pseudo': response.data.Pseudo,
          'connect': true
        };
      }
    });
  }



  //---------------------------------------------------------------------------
  //  **

  // To connect user with his/her account
  // --------------------------------------------------------------------------
  $scope.connectUser = function()
  {

    // Build connectUser object
    // -------------------------------------
    var connectUser = {
      Pseudo: $scope.Pseudo,
      Password: $scope.Password
    };


    // Send object 'connectUser' to the NODE server
    // ------------------------------------------------------
    $http.post('http://localhost:8000/connectUser', connectUser).then(function(response)
    {
      // Deal with the response of the server
      // ---------------------------------------------------
      if(response.data == "Connecting user FAILED")
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': false,
          'iconViewInfo': true,
          'label': 'WARNING - Informations are not correct'
        };
      }
      else if (response.data == "Error with fonction MONGO DB - find()")
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': true,
          'iconViewInfo': false,
          'label': 'ERROR - mongoDB does not work, try again later'
        };
      }
      else
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': true,
          'iconViewNOK': false,
          'iconViewInfo': false,
          'label': 'You are connect, now'
        };

        $rootScope.InformationConnectUser =  {
          'Firstname': response.data.Firstname,
          'Lastname': response.data.Lastname,
          'Email': response.data.Email,
          'Pseudo': response.data.Pseudo,
          'connect': true
        };

      }
    });
  }



  //---------------------------------------------------------------------------
  //  **

  // To log out the user
  // --------------------------------------------------------------------------
  $scope.logOut = function()
  {
    $rootScope.ServerInformation = {
      'divView': true,
      'iconViewOK': false,
      'iconViewNOK': false,
      'iconViewInfo': true,
      'label': 'You are disconnect, now'
    };

    $rootScope.InformationConnectUser =  {
      'Firstname': '',
      'Lastname': '',
      'Email': '',
      'Pseudo': '',
      'connect': false
    };
  };



  //---------------------------------------------------------------------------
  //  **

  // To remove the account of the user who's connect
  // --------------------------------------------------------------------------
  $scope.removeAccount = function()
  {
    // Build removeUser object
    // -------------------------------------
    var removeAccount = {
      Pseudo: $rootScope.InformationConnectUser.Pseudo
    };

    // Send object 'connectUser' to the NODE server
    // ------------------------------------------------------
    $http.post('http://localhost:8000/removeAccount', removeAccount).then(function(response)
    {
      // Deal with the response of the server
      // ---------------------------------------------------
      if(response.data == "Remove account FAILED")
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': true,
          'iconViewNOK': false,
          'iconViewInfo': false,
          'label': 'ERROR - Account does not exist in the databas'
        };
      }
      else if (response.data == "Error with function MONGO DB - remove()")
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': true,
          'iconViewNOK': false,
          'iconViewInfo': false,
          'label': 'ERROR - mongoDB does not work, try again later'
        };
      }
      else
      {
        $rootScope.ServerInformation = {
          'divView': true,
          'iconViewOK': false,
          'iconViewNOK': false,
          'iconViewInfo': true,
          'label': 'Your account is remove, see you soon !'
        };

        $rootScope.InformationConnectUser =  {
          'Firstname': '',
          'Lastname': '',
          'Email': '',
          'Pseudo': '',
          'connect': false
        };

      }
    });

  }


});
