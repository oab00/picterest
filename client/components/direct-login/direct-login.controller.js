'use strict';

angular.module('pinterestNewApp')
  .controller('DirectLoginCtrl', function ($scope, $location, $timeout, $window, Auth) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $window.location.reload();
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      console.log(form);
      if ($scope.user.email !== undefined && $scope.user.email.match(/[\/]/g) !== null) {
        alert('Found characters that are not allowed in the name.');
        return;
      }

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.email,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $window.location.reload();
        })
        .catch( function(err) {
          console.log(err);
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });