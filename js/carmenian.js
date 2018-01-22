// carmenian.js

// ------------
//   Armenian
// ------------

define('carmenian', ['constants', 'cfunctions', 'cegyptian'] , function(k, f, c) {

    // Force strict mode
    'use strict';

    // Variable to hold the API
    var ca = {};

    //
    // Usage:
    //
    // Ref.: (1.42)
    //
    var fixedFromArmenian = function(year, month, day){
        return (k.ARMENIAN_EPOCH + c.fixedFromEgyptian(year, month, day) - k.EGYPTIAN_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.43)
    //
    var armenianFromFixed = function(date){
        return c.egyptianFromFixed(date + k.EGYPTIAN_EPOCH - k.ARMENIAN_EPOCH);
    }

    // Check validity of an Armenian date
    //
    // Usage:
    // validArmenianDate([yyy, mm, dd]) -> True or False
    //
    var validArmenianDate = function(armenianDate){
        return (armenianDate === armenianFromFixed(fixedFromArmenian(armenianDate[0], armenianDate[1],armenianDate[2])));
    }

    // Public API - functions, varaibles and constanst to be exposed
        
    ca.fixedFromArmenian       = fixedFromArmenian;
    ca.armenianFromFixed       = armenianFromFixed;
    ca.validArmenianDate       = validArmenianDate;
        
    return ca;

});