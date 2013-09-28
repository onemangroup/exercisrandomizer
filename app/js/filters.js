'use strict';

/* Filters */
angular.module('randomizerFilters', []).filter('range', function() {
    return function(input, from , to) {
        from = parseInt(from);
        to = parseInt(to);
        for (var i=from; i<=to; i++)
            input.push(i);
        return input;
    };
});