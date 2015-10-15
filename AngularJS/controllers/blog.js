var blogESIEA = angular.module('blogESIEA', []);

/* **

  Init Globals variables
  Check if a user's already connect
  ------------------------------------
** */
blogESIEA.run(function($rootScope, $http)
{

    $rootScope.ServerInformation = {
      'divView': false,
      'iconViewInfo': false,
      'iconViewOK': false,
      'iconViewNOK': false,
      'label': ''
    };

    $rootScope.InformationConnectUser =  {
      'Firstname': '',
      'Lastname': '',
      'Email': '',
      'Pseudo': '',
      'connect': false
    };


});


blogESIEA.controller('index', function($scope, $rootScope, $http)
{


  $scope.equalsTo = function(string1, string2)
  {
    if(string1 == string2)
    {
      return true;
    }
    else
    {
      return false;
    }
  }


  // Init variables of the page
  // ---------------------------------------------------------------------------
  $scope.titlePage = 'Blog ESIEA';



  // To close the server informations div
  // ---------------------------------------------
  $scope.closeServerInformation = function()
  {
    $rootScope.ServerInformation = {
      'divView': false
    };
  }



  // Change color's menu to have the search style
  // -----------------------------------------------------------------
  $scope.goSearchStyle = function()
  {
    $scope.titlePage = 'Search';
    $scope.styleTopMenu = {"background-color": "#878785"};
  }


  // Change color's menu to have the search style
  // -----------------------------------------------------------------
  $scope.goNominalStyle = function()
  {
    $scope.titlePage = 'Blog ESIEA';
    $scope.styleTopMenu = {"background-color": "#318CE7"};
  }

});
