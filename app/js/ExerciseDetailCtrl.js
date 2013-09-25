'use strict';

/* ExerciseDetailCtrl */
/* Author: Mark Streichan
 Username: onemangroup
 Date: 24.09.2013
 */

app.controller('ExerciseDetailCtrl', function($scope, $http, FacebookService, Facebook, $routeParams, $location)
{
    $scope.id = $routeParams.id;
    var promise = FacebookService.getUserData($scope.id);

    promise.then(function(success) {
        $scope.exerciseList = success;
        console.log(success);
    }, function(error) {
        console.log(error);
    }, function(update) {
        console.log(update);
    });

    $scope.changeView = function(view){
        $location.path(view);
    }
})