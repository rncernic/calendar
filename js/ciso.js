// ciso.js

// -------
//   ISO
// -------

define('ciso', ['constants', 'cfunctions', 'gholidays', 'cgregorian'] , function(k, f, h, g) {

    // Force strict mode
    'use strict';

    // Variable to hold the API
    var ci = {};
    
    // Number of days since the beginning of the epoch until the date
    //
    // Usage:
    //  fixedFromISO([year, week, day])
    //  fixedFromISO([1943, 40, 4]) -> 709580
    //
    // Ref.: (5.1)
    //
    var fixedFromISO = function(w_date){  
        return (h.nthKday(w_date[1], k.SUNDAY, [w_date[0] - 1, k.DECEMBER, 28]) + w_date[2]);
    }
    
    var isoFromFixed = function(w_date){
        var approx;
        var year; 
        var week;
        var day;

        approx  = g.gregorianYearFromFixed(w_date - 3);

        if (w_date >= fixedFromISO([approx + 1, 1, 1])){
            approx = approx + 1
        }

        year = approx;

        week = 1 + f.floor(1/7 *(w_date - fixedFromISO([year, 1, 1])));

        day = f.amod(w_date, 7);

        return [year, week, day];
    }

    var isoLongYear = function(i_year){
        return ((f.dayOfWeekFromFixed(g.gregorianNewYear(i_year)) == k.THURSDAY) || (f.dayOfWeekFromFixed(g.gregorianYearEnd(i_year)) == k.THURSDAY));
    }

    // Public API - functions, varaibles and constanst to be exposed
        
    ci.fixedFromISO     = fixedFromISO;
    ci.isoFromFixed     = isoFromFixed;
    ci.isoLongYear      = isoLongYear;
        
    return ci;

});