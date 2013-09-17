'use strict';

/* Controllers */

app.controller('ExerciseCtrl', function($scope, $http)
{
        $scope.selectedMuscleGroups = [{}];
        $scope.exerciseList = [];
        $scope.muscleGroups = [ {group:"chest", state: false},
                                {group:"back", state: false},
                                {group:"biceps", state: false},
                                {group:"triceps", state: false},
                                {group:"shoulders", state: false},
                                {group:"forearm", state: false},
                                {group:"abs", state: false},
                                {group:"upperleg", state: false},
                                {group:"glutes", state: false},
                                {group:"calves", state: false},
                                {group:"traps", state: false}]

        $scope.getExercises = function()
        {
            $http.get('data/data.json')
            .success
            (
                 function(data, status, headers, config)
                 {
                    $scope.exerciseList = data;
                    //alert("foo: " + $scope.exerciseList);
                 }
            ).error
            (
                 function(data, status, headers, config)
                 {
                    alert( "Error: " + data.responseText + "\n" + status );
                 }
             );
        }

        $scope.filterExercises = function()
        {

        }

        $scope.isSelected = function(muscleGroup)
        {
            $scope.isTrue = false;
            angular.forEach($scope.muscleGroups, function(value, key)
            {
                if((value.state == true && muscleGroup[value.group] == "x"))
                {
                    $scope.isTrue = true;
                }
//                else if((value.state == true && muscleGroup[value.group] == "-"))
//                {
//                    $scope.isTrue = false;
//                }
            }
            )
            return $scope.isTrue;
        }
})