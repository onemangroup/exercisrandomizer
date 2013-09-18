'use strict';

/* Controllers */

app.controller('ExerciseCtrl', function($scope, $http)
{
        $scope.selectedMuscleGroups = [{}];
        $scope.loadedExercises = [];
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

//        $scope.getExercises = function()
//        {
            $http.get('data/data.json')
            .success
            (
                 function(data, status, headers, config)
                 {
                    $scope.loadedExercises = data;
                    console.log("foo: " + $scope.loadedExercises);
                 }
            ).error
            (
                 function(data, status, headers, config)
                 {
                    console.log( "Error: " + data.responseText + "\n" + status );
                 }
             )
//        }

        $scope.filterExercises = function()
        {
            $scope.exerciseList = [];
            console.clear();
            angular.forEach($scope.loadedExercises, function(value, key)
            {
                if($scope.isSelected(value))
                {
                    console.log(value);
                    $scope.exerciseList.push(value);
                }
            }
            )
        }

        $scope.random = function() {
            return 0.5 - Math.random();
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