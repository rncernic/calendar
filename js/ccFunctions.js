// ccFunctions.js

// Dependencies
var ccConstants = ccConstants || require('./ccConstants');

// --------------------
//   Common functions
// --------------------

var ccFunctions = {};

(function(){
    
    // Force strict mode
    'use strict';
    
    // ***************************************************
    //   A U X I L I A R Y   M A T H   F U N C T I O N S
    // ***************************************************
    
    // Shortcuts to math functions. Easier to write and read
    
    ccFunctions.PI      = Math.PI,
    ccFunctions.sin     = Math.sin,
    ccFunctions.cos     = Math.cos,
    ccFunctions.tan     = Math.tan,
    ccFunctions.asin    = Math.asin,
    ccFunctions.acos    = Math.acos,
    ccFunctions.atan    = Math.atan2,
    ccFunctions.pow     = Math.pow,
    ccFunctions.floor   = Math.floor,
    ccFunctions.rad     = Math.PI / 180;

    // Sum
    //
    // Usage:
    // sum(2,3,2,1) -> 8
    //
    ccFunctions.sum = function(){
        var x = 0;
        for (var i = arguments.length - 1; i >= 0; i--){
          x += arguments[i];
        }
        return x;
    }

    // Great common denominator function (2 numbers)
    // using euclidean algorithm
    //
    // Usage:
    //
    ccFunctions.gcd = function(a, b){
        if ( ! b) {
          return a;
        }
        return gcd(b, a % b);
    }

    // Least common multiple between two numbers
    //
    // Usage:
    // lcm(10,15) -> 30
    // lcm( 3,15) -> 15
    //
    ccFunctions.lcm = function(a, b){
        return a * b / gcd(a, b);
    }

    // ATTENTION !!
    // Use this fucntion instead of the operator '%', because it doesn't
    // give the right answer for negative numbers
    //
    // Ref.: (1.15)
    //
    ccFunctions.mod = function(x, y){
        return x - y * Math.floor(x / y);
    }

    //
    //
    //
    ccFunctions.amod = function(a, b){
        return b + ccFunctions.mod(a, -b);
    }

    //
    //
    //
    ccFunctions.next = function(index, predicate){
        if (predicate(index)){
          return index;
        }
        else {
          return next(index + 1, predicate);
        }
    }

    //
    //
    //
    ccFunctions.final = function(index, predicate){
        if (! predicate(index)){
          return index - 1;
        }
        else {
          return final(index - 1, predicate);
        }
    }
    
    //
    //
    //
    ccFunctions.binarySearch = function(low, high, dir, condition){
        var mid = (low + high) / 2;
        if (dir(low, high)){
            return mid;
        } else if (condition(mid)){
            return binarySearch(low, mid, dir, condition);
        } else {
            return binarySearch(mid, high, dir, condition);
        }
    }

    //
    //
    //
    ccFunctions.invertAngular = function(func, y, low, high){
        var precision = Math.pow(10, -5);
        return binarySearch(low, high,
                            function(l, h) {return (h-l) <= precision;},
                            function(x) {return ccFunctions.mod(func(x) - y, 360) < 180}
                           );
    }
    
    // ***************************************************
    //   A U X I L I A R Y   T I M E   F U N C T I O N S
    // ***************************************************

    //
    // Usage:
    //
    // Ref.: (1.9)
    //
    ccFunctions.fixedFromMoment = function(t){
        return (Math.floor(t));
    }

    //
    // Usage:
    //
    // Ref.: (1.16)
    //
    ccFunctions.timeFromMoment = function(t){
        return (ccFunctions.mod(t, 1));
    }

    //
    // Usage:
    //
    // Ref.: (1.34)
    //
    ccFunctions.timeFromClock = function(h, m, s){
        return ((h + (m + s / 60) / 60) / 24);
    }

    //
    // Usage:
    //
    // Ref.: (1.35)
    //
    ccFunctions.clockFromTime = function(t){
        var time   = ccFunctions.timeFromMoment(t);
        var hour   = Math.floor(time * 24);
        var minute = Math.floor((time * 24 * 60) % 60);
        var second = (time * 24 * 60 * 60) % 60;
        return ([hour, minute, second]);
    }

    //
    // Usage:
    //
    // Ref.: (1.37)
    //
    ccFunctions.angleFromDegrees = function(a){
        var d = Math.floor(a);
        var m = Math.floor(60 * (a % 1));
        var s = (a * 60 * 60) % 60;
        return ([d, m, s]);
    }


    // ***************************************
    //   C A L E N D A R   F U N C T I O N S
    // ***************************************

    // RD - Rata Die
    //
    // Usage:
    //
    // Ref.: (1.1)
    //
    ccFunctions.rd = function(t, epoch){
        return (t - epoch);
    }

    // DoW - Day of Week
    //
    // Usage:
    //
    // Ref.: (1.51)
    //
    ccFunctions.dayOfWeekFromFixed = function(date){
        return ccFunctions.mod((date - ccConstants.SUNDAY), 7);
    }

    //
    // Usage:
    //
    // Ref.: (1.53)
    //
    ccFunctions.kdayOnOrBefore = function(k, date){
        return (date - ccFunctions.dayOfWeekFromFixed(date - k));
    }

    //
    // Usage:
    //
    // Ref.: (1.58)
    //
    ccFunctions.kdayOnOrAfter = function(k, date){
        return (ccFunctions.kdayOnOrBefore(k, date+6));
    }

    //
    // Usage:
    //
    // Ref.: (1.59)
    //
    ccFunctions.kdayNearest = function(k, date){
        return (ccFunctions.kdayOnOrBefore(k, date + 3));
    }

    //
    // Usage:
    //
    // Ref.: (1.60)
    //
    ccFunctions.kdayBefore = function(k, date){
        return (kdayOnOrBefore(k, date - 1));
    }

    //
    // Usage:
    //
    // Ref.: (1.61)
    //
    ccFunctions.kdayAfter = function(k, date){
        return (ccFunctions.kdayOnOrBefore(k, date + 7));
    }
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ccFunctions;
      }
          
})();