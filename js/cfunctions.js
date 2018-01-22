// cfunctions.js

// --------------------
//   Common functions
// --------------------

define('cfunctions', ['constants'], function(k){

    // Force strict mode
    'use strict';    
 
    var f = {};
    
    // ***************************************************
    //   A U X I L I A R Y   M A T H   F U N C T I O N S
    // ***************************************************
    
    // Shortcuts to math functions. Easier to write and read
    
    var PI      = Math.PI,
        sin     = Math.sin,
        cos     = Math.cos,
        tan     = Math.tan,
        asin    = Math.asin,
        acos    = Math.acos,
        atan    = Math.atan2,
        pow     = Math.pow,
        floor   = Math.floor,
        rad     = PI / 180;

    // Sum
    //
    // Usage:
    // sum(2,3,2,1) -> 8
    //
    var sum = function(){
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
    var gcd = function(a, b){
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
    var lcm = function(a, b){
        return a * b / gcd(a, b);
    }

    // ATTENTION !!
    // Use this fucntion instead of the operator '%', because it doesn't
    // give the right answer for negative numbers
    //
    // Ref.: (1.15)
    //
    var mod = function(x, y){
        return x - y * floor(x / y);
    }

    //
    //
    //
    var amod = function(a, b){
        return b + mod(a, -b);
    }

    //
    //
    //
    var next = function(index, predicate){
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
    var final = function(index, predicate){
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
    var binarySearch = function(low, high, dir, condition){
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
    var invertAngular = function(func, y, low, high){
        var precision = pow(10, -5);
        return binarySearch(low, high,
                            function(l, h) {return (h-l) <= precision;},
                            function(x) {return mod(func(x) - y, 360) < 180}
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
    var fixedFromMoment = function(t){
        return (floor(t));
    }

    //
    // Usage:
    //
    // Ref.: (1.16)
    //
    var timeFromMoment = function(t){
        return (mod(t, 1));
    }

    //
    // Usage:
    //
    // Ref.: (1.34)
    //
    var timeFromClock = function(h, m, s){
        return ((h + (m + s / 60) / 60) / 24);
    }

    //
    // Usage:
    //
    // Ref.: (1.35)
    //
    var clockFromTime = function(t){
        var time   = timeFromMoment(t);
        var hour   = floor(time * 24);
        var minute = floor((time * 24 * 60) % 60);
        var second = (time * 24 * 60 * 60) % 60;
        return ([hour, minute, second]);
    }

    //
    // Usage:
    //
    // Ref.: (1.37)
    //
    var angleFromDegrees = function(a){
        var d = floor(a);
        var m = floor(60 * (a % 1));
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
    var rd = function(t, epoch){
        return (t - epoch);
    }

    // DoW - Day of Week
    //
    // Usage:
    //
    // Ref.: (1.51)
    //
    var dayOfWeekFromFixed = function(date){
        return mod((date - k.SUNDAY), 7);
    }

    //
    // Usage:
    //
    // Ref.: (1.53)
    //
    var kdayOnOrBefore = function(k, date){
        return (date - dayOfWeekFromFixed(date - k));
    }

    //
    // Usage:
    //
    // Ref.: (1.58)
    //
    var kdayOnOrAfter = function(k, date){
        return (kdayOnOrBefore(k, date+6));
    }

    //
    // Usage:
    //
    // Ref.: (1.59)
    //
    var kdayNearest = function(k, date){
        return (kdayOnOrBefore(k, date + 3));
    }

    //
    // Usage:
    //
    // Ref.: (1.60)
    //
    var kdayBefore = function(k, date){
        return (kdayOnOrBefore(k, date - 1));
    }

    //
    // Usage:
    //
    // Ref.: (1.61)
    //
    var kdayAfter = function(k, date){
        return (kdayOnOrBefore(k, date + 7));
    }

    // Public API - functions, varaibles and constanst to be exposed

    f.PI                    = PI;
    f.sin                   = sin;
    f.cos                   = cos;
    f.tan                   = tan;
    f.asin                  = asin;
    f.acos                  = acos;
    f.atan                  = atan;
    f.pow                   = pow;
    f.floor                 = floor;
    f.rad                   = rad;

    f.sum                   = sum;
    f.gcd                   = gcd;
    f.lcm                   = lcm;
    f.mod                   = mod;
    f.amod                  = amod;
    f.next                  = next;
    f.final                 = final;
    f.binarySearch          = binarySearch;
    f.invertAngular         = invertAngular;
    
    f.fixedFromMoment       = fixedFromMoment;
    f.timeFromMoment        = timeFromMoment;
    f.timeFromClock         = timeFromClock;
    f.clockFromTime         = clockFromTime;
    f.angleFromDegrees      = angleFromDegrees;
    f.rd                    = rd;
    f.dayOfWeekFromFixed    = dayOfWeekFromFixed;
    f.kdayOnOrBefore        = kdayOnOrBefore;
    f.kdayOnOrAfter         = kdayOnOrAfter;
    f.kdayNearest           = kdayNearest;
    f.kdayBefore            = kdayBefore;
    f.kdayAfter             = kdayAfter;
    
    return f;
    
});
