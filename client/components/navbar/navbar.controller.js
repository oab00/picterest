'use strict';

angular.module('pinterestNewApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $routeParams, $timeout) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
      location.reload();
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    var user = $scope.getCurrentUser();

    var done = false;

    function checkLogin() {
      if (user.name) {
        done = true;
        $scope.menu.push({
          'title': 'My Collection',
          'link': '/c/' + user.name
        });
      }

      if ($routeParams.user && $routeParams.user !== user.name) {
        done = true;
        $scope.menu.push({
          'title': $routeParams.user + '\'s Collection',
          'link': '/c/' + $routeParams.user
        });
      }
    }

    checkLogin();

    if (!done) {
      $timeout(checkLogin, 50);
    }
  });