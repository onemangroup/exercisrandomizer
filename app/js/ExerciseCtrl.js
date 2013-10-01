'use strict';

/* ExerciseCtrl */
/* Author: Mark Streichan
   Username: onemangroup
   Date: 17.09.2013
 */

app.controller('ExerciseCtrl', function($scope, $http, orderByFilter, FacebookService, Facebook, $location, $routeParams, $window, $document)
{
        $scope.$watch($routeParams, function() {
        }, true);

        $scope.disablePostButton = function(){
            $scope.buttonState = "disabled";
        }

        $scope.enablePostButton = function(){
            $scope.buttonState = "";
        }
        $scope.disablePostButton();

        $scope.loadedExercises = [];
        $scope.exerciseList = [];
        $scope.levels = [{level: "beginner", label: "LEVEL_BEGINNER", range:"3-5"},
                        {level: "medium", label: "LEVEL_INTERMEDIATE", range:"6-12"},
                        {level: "hard", label: "LEVEL_PRO", range:"13-20"}
                       ];
        $scope.level = "beginner";
        $scope.muscleGroups = [ {group:"chest", label: "EXERCISE_CHEST", state: false},
                                {group:"back", label: "EXERCISE_BACK", state: false},
                                {group:"biceps", label: "EXERCISE_BICEPS", state: false},
                                {group:"triceps", label: "EXERCISE_TRICEPS", state: false},
                                {group:"shoulders", label: "EXERCISE_SHOULDER", state: false},
                                {group:"forearm", label: "EXERCISE_FOREARM", state: false},
                                {group:"abs", label: "EXERCISE_ABS", state: false},
                                {group:"upperleg", label: "EXERCISE_LEGS", state: false},
                                {group:"glutes", label: "EXERCISE_GLUTES", state: false},
                                {group:"calves", label: "EXERCISE_CALVES", state: false},
                                {group:"traps", label: "EXERCISE_TRAPS", state: false}]

        $http.get('data/data.json')
        .success
        (
             function(data, status, headers, config)
             {
                $scope.loadedExercises = data;
             }
        ).error
        (
             function(data, status, headers, config)
             {
                console.log( "Error: " + data.responseText + "\n" + status );
             }
        )

        $scope.filterExercises = function()
        {
            $scope.exerciseList = [];
//            console.clear();
            angular.forEach($scope.loadedExercises, function(value, key)
            {
                if($scope.isSelected(value))
                {
                    var range = $scope.getRangeForLevel().split("-");
                    var rep = getRandomArbitrary(Number(range[0]), Number(range[1]));
                    $scope.exerciseList.push({exercisename: value.exercisename, reps: rep, image: value.image});
                }
            }
            )

            console.log($scope.exerciseList.length);
            if($scope.exerciseList.length > 0)
            {
                $scope.buttonState = "";
                shuffle($scope.exerciseList);
            }else
            {
                $scope.disablePostButton();
            }
            console.log($scope.buttonState);
        }

        /**
         * Watch for Facebook to be ready.
         * There's also the event that could be used
         */
        $scope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        $scope.postWorkout = function(url, title, descr, image, winWidth, winHeight)
        {
            //$scope.disablePostButton();

            var promise = FacebookService.getUser();
            promise.then(function(success) {
                console.log(success);
                var postList = $scope.exerciseList;
                if(postList.length > 8){
                    postList.splice(7, postList.length - 8);
                }
                FacebookService.postStorySharer(postList, url, title, descr, image, winWidth, winHeight);
                //var p2 = FacebookService.postStory(postList)
//                p2.then(function(s){
//                    $scope.enablePostButton();
//                }, function(e){
//                    $scope.enablePostButton();
//                }, function(u){
//                    $scope.enablePostButton();
//                });
            }, function(error) {
                var p3 = FacebookService.loginUser();
                p3.then(function(success){
                    console.log("login successful");
                    $scope.enablePostButton();
                }, function(error){
                    console.log("error");

                }, function(update){
                    console.log("update");
                });
            }, function(update) {
                console.log(update);
            });
        }

        $scope.getRangeForLevel = function(){
            var range = "";

            angular.forEach($scope.levels, function(value, key){
                if(value.level == $scope.level){
                    range = value.range;
                }
            })
            return range;
        }

        $scope.random = function() {
            return 0.5 - Math.random();
        }

        $scope.radioButtonState = function(item)
        {
            if(item.level == $scope.level)
            {
                return "active";
            }
        }

        $scope.checkboxState = function(item)
        {
            if(item.state )
            {
                return "active";
            }
        }

        $scope.isSelected = function(muscleGroup)
        {
            $scope.isTrue = false;
            angular.forEach($scope.muscleGroups, function(value, key)
            {
                if(value.state == true && muscleGroup[value.group] == "x" && muscleGroup[$scope.level] == "x")
                {
                    $scope.isTrue = true;
                }
            }
            )
            return $scope.isTrue;
        }
})

var shuffle = function(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

    return o;
};

function getRandomArbitrary(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}