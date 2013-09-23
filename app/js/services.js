'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
app.service('FacebookService', function($q, $rootScope, $http, $window, $document, Facebook) {
    var deferred = $q.defer();

    return {
        getUser: function(){

            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    Facebook.api('/me', function(response) {
                        /**
                         * Using $scope.$apply since this happens outside angular framework.
                         */
                        $rootScope.$apply(function() {
                            $rootScope.user = response;
                            deferred.resolve(response);
                        });
                    });
                }
                else{
                     deferred.reject("error while getting loging data");
                }
            });
            return deferred.promise;
        },

        postStory: function(exerciseList){
            console.log("postStory");
            var d = $q.defer();

            $http({
                url: 'https://ssl.webpack.de/grenz-schutz.de/php/dbService.php',
                method: 'POST',
                params: {action: "save", userid: $rootScope.user.id, name: $rootScope.user.name, json: exerciseList},
                headers: {'Content-Type': 'application/json'}
            }).
                success(function(data) {
                    if(data != 0)
                    {
                        var params = {};
                        params['message'] = 'Thats my workout for today - No Games, Just Pull Ups!';
                        params['name'] = 'Workout Generator';
                        params['description'] = 'No Games, Just Pull Ups!';
                        params['link'] = 'https://apps.facebook.com/workoutgenerator/?id=' + data;
                        params['picture'] = 'http://grenz-schutz.de/img/thumb_116x116.jpg';
                        params['caption'] = 'Workout Generator - Street Workout Duesseldorf';
                        params['privacy'] = {'value':'SELF'};

                        Facebook.api('/me/feed', 'post', params, function(response) {
                            if (!response || response.error) {
                                console.log("Fehler");
                                console.log(response);
                            } else {
                                console.log('Published to stream - you might want to delete it now!');
                                $rootScope.$apply(function(){
                                    d.resolve("posted to wall");
                                })
                            }
                        });
                    }
                }
            );
            return d.promise;
        }
    };
});