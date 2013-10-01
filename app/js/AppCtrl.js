/**
 * Created by IntelliJ IDEA.
 * User: onemangroup
 * Date: 24.09.13
 * Time: 22:14
 * To change this template use File | Settings | File Templates.
 */

app.controller('AppCtrl', function($scope, $rootScope, $http, $log, $location, $window, $document, $translate)
{
    $scope.$watch($scope, function() {
        console.log($window.i);
        if($window.i != undefined)
        {
            $location.path('show/' + $window.i);
        }
    }, true);


    $scope.changeLanguage = function(lang)
    {
        $log.info(lang);
        $translate.uses(lang);
    }
})