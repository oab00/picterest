'use strict';

angular.module('pinterestNewApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/collection', {
        templateUrl: 'app/collection/collection.html',
        controller: 'CollectionCtrl'
      });
  });
