'use strict';

angular.module('pinterestNewApp')
  .controller('CollectionCtrl', function ($scope, $routeParams, $http, Auth) {
    
    $scope.pictures = [];
    $scope.title = '';

    var user = Auth.getCurrentUser();
    var collectionUser = $routeParams.user;

    $scope.showDeleteButton = collectionUser === user.name;

    if (collectionUser === user.name) {
    	$scope.title = 'My Collection';
    } else {
    	$scope.title = collectionUser + '\'s Collection:';
    }

    $http.get('/api/pictures').success(function(pictures) {
    	// TODO: change this to a specific api call
      $scope.pictures = pictures.filter(function(picture) {
      	return picture.user.name === collectionUser;
      });
    });
    
    $scope.addPicture = function() {
      if($scope.newPicture === '') {
        return;
      }
      $http.post('/api/pictures', { 
        url: $scope.newPicture,
        user: user
      }).success(function(picture) {
          $scope.pictures.push(picture);
          $scope.newPicture = '';
      });
      // TODO: .error  and  placeholder image
      
    };

    $scope.deletePicture = function(index) {
      $http.delete('/api/pictures/' + $scope.pictures[index]._id)
          .success(function() {
            $scope.pictures.splice(index, 1);
          });
    };

  });
