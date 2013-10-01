'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
app.service('FacebookService', function($q, $rootScope, $http, $window, $document, Facebook, $location) {
    var deferred = $q.defer();

    return {
        getUser: function(){
            deferred = $q.defer();
            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    console.log(response);

                    console.log(parse_signed_request(response.authResponse.signedRequest));
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

        loginUser: function(){
            deferred = $q.defer();
            Facebook.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    $rootScope.$apply(function() {
                        deferred.resolve(response);
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                    $rootScope.$apply(function() {
                        deferred.reject(response);
                    });
                }
            });
            return deferred.promise;
        },

        postStorySharer: function(exerciseList, url, title, descr, image, winWidth, winHeight){
            console.log("postStory");
            var d = $q.defer();

            $http({
                url: $rootScope.absUrl + 'php/dbService.php',
                method: 'POST',
                params: {action: "save", userid: $rootScope.user.id, name: $rootScope.user.name, json: exerciseList},
                headers: {'Content-Type': 'application/json'}
            }).
                success(function(data) {
                    var winTop = (screen.height / 2) - (winHeight / 2);
                    var winLeft = (screen.width / 2) - (winWidth / 2);
                    var newURL = 'http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + encodeURIComponent(url + data) + '&p[images][0]=' + image;
                    console.log(newURL);
                    $window.open(newURL, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight)
                }
            );
            return d.promise;
        },

        postStory: function(exerciseList){
            console.log("postStory");
            var d = $q.defer();

            $http({
                url: $rootScope.absUrl + 'php/dbService.php',
                method: 'POST',
                params: {action: "save", userid: $rootScope.user.id, name: $rootScope.user.name, json: exerciseList},
                headers: {'Content-Type': 'application/json'}
            }).
                success(function(data) {
                    if(data != 0)
                    {
                        var params = {};
                        params['method'] = 'feed';
                        if($window.name == "iframe_canvas_fb_https")
                        {
                            params['display'] = 'async';
                        }else{
                            params['display'] = 'iframe';
                        }
                        params['message'] = 'Thats my workout for today - No Games, Just Pull Ups!';
                        params['name'] = 'Workout Generator';
                        params['description'] = 'No Games, Just Pull Ups!';
                        params['link'] = 'https://apps.facebook.com/workoutgenerator/?sk=691726554190169/' + data;
                        params['picture'] = 'http://grenz-schutz.de/img/thumb_116x116.jpg';
                        params['caption'] = 'Workout Generator - Street Workout Duesseldorf';
                        params['privacy'] = {'value':'SELF'};


                        FB.ui(params, function(response){
                            if (!response || response.error) {
                                console.log("Fehler");
                                $rootScope.$apply(function(){
                                    d.reject(response);
                                })
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
        },

        getUserData: function(id){
            var d = $q.defer();

            $http({
                url: $rootScope.absUrl + '/php/dbService.php',
                method: 'POST',
                params: {action: "get", id: id},
                headers: {'Content-Type': 'application/json'}
            }).
                success(function(data) {
                    d.resolve(data);
                });
            return d.promise;
        }
    };
});

function parse_signed_request(signed_request, secret) {
    var encoded_data = String(signed_request).split('.',2);

    // decode the data
    console.log(encoded_data[0]);
    console.log(encoded_data[1]);
    var sig = base64_url_decode(encoded_data[0]);
    var json = base64_url_decode(encoded_data[1]);
    var data = JSON.parse(json); // ERROR Occurs Here!
    console.log(data);


    return data;
}

function base64_url_decode(input) {
    return atob(strtr(input, '-_', '+/'));
}

function strtr (str, from, to) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // +      input by: uestla
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Alan C
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Taras Bogach
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: jpfle
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // -   depends on: krsort
    // -   depends on: ini_set
    // *     example 1: $trans = {'hello' : 'hi', 'hi' : 'hello'};
    // *     example 1: strtr('hi all, I said hello', $trans)
    // *     returns 1: 'hello all, I said hi'
    // *     example 2: strtr('äaabaåccasdeöoo', 'äåö','aao');
    // *     returns 2: 'aaabaaccasdeooo'
    // *     example 3: strtr('ääääääää', 'ä', 'a');
    // *     returns 3: 'aaaaaaaa'
    // *     example 4: strtr('http', 'pthxyz','xyzpth');
    // *     returns 4: 'zyyx'
    // *     example 5: strtr('zyyx', 'pthxyz','xyzpth');
    // *     returns 5: 'http'
    // *     example 6: strtr('aa', {'a':1,'aa':2});
    // *     returns 6: '2'
    var fr = '',
        i = 0,
        j = 0,
        lenStr = 0,
        lenFrom = 0,
        tmpStrictForIn = false,
        fromTypeStr = '',
        toTypeStr = '',
        istr = '';
    var tmpFrom = [];
    var tmpTo = [];
    var ret = '';
    var match = false;

    // Received replace_pairs?
    // Convert to normal from->to chars
    if (typeof from === 'object') {
        tmpStrictForIn = this.ini_set('phpjs.strictForIn', false); // Not thread-safe; temporarily set to true
        from = this.krsort(from);
        this.ini_set('phpjs.strictForIn', tmpStrictForIn);

        for (fr in from) {
            if (from.hasOwnProperty(fr)) {
                tmpFrom.push(fr);
                tmpTo.push(from[fr]);
            }
        }

        from = tmpFrom;
        to = tmpTo;
    }

    // Walk through subject and replace chars when needed
    lenStr = str.length;
    lenFrom = from.length;
    fromTypeStr = typeof from === 'string';
    toTypeStr = typeof to === 'string';

    for (i = 0; i < lenStr; i++) {
        match = false;
        if (fromTypeStr) {
            istr = str.charAt(i);
            for (j = 0; j < lenFrom; j++) {
                if (istr == from.charAt(j)) {
                    match = true;
                    break;
                }
            }
        } else {
            for (j = 0; j < lenFrom; j++) {
                if (str.substr(i, from[j].length) == from[j]) {
                    match = true;
                    // Fast forward
                    i = (i + from[j].length) - 1;
                    break;
                }
            }
        }
        if (match) {
            ret += toTypeStr ? to.charAt(j) : to[j];
        } else {
            ret += str.charAt(i);
        }
    }

    return ret;
}