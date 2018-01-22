// cegyptian.js

// ------------
//   Egyptian
// ------------

define('cegyptian', ['constants', 'cfunctions'] , function(k, f) {

    // Force strict mode
    'use strict';

    // Variable to hold the API
    var ce = {};
    
    //
    // Usage:
    //
    // Ref.: (1.39)
    //
    var fixedFromEgyptian = function(year, month, day){
        return (k.EGYPTIAN_EPOCH + 365 * (year - 1) + 30 * (month - 1) + day - 1);
    }

    //
    // Usage:
    //
    // Ref.: (1.40)
    //
    var egyptianFromFixed = function(date){
        var days  = date - k.EGYPTIAN_EPOCH;
        var year  = f.floor(days / 365) + 1;
        var month = f.floor(f.mod(days, 365) / 30) + 1;
        var day   = days - 365 * (year - 1) - 30 * (month - 1) + 1;
        return ([year, month, day]);
    }

    // Check validity of an Egyptian date
    //
    // Usage: validEgyptianDate([yyyy, mm, dd]) -> True or False
    //
    var validEgyptianDate = function(egyptianDate){
        return (egyptianDate === egyptianFromFixed(fixedFromEgyptian(egyptianDate[0], egyptianDate[1],egyptianDate[2])));
    }
   
    // Public API - functions, varaibles and constanst to be exposed
        
    ce.fixedFromEgyptian    = fixedFromEgyptian;
    ce.egyptianFromFixed    = egyptianFromFixed;
    ce.validEgyptianDate    = validEgyptianDate;
    
    return ce;

});