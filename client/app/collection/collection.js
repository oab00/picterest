'use strict';

angular.module('pinterestNewApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/c/:user', {
        templateUrl: 'app/collection/collection.html',
        controller: 'CollectionCtrl'
      });
  });
