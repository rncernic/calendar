// calendar.js

// -------------
//   Gregorian
// -------------

define('cgregorian', ['constants', 'cfunctions'] , function(k, f) {

    // Force strict mode
    'use strict';

    // Variable to hold the API
    var cg = {};
    
    // Is a gregorian year leap?
    //
    // Usage:
    // gregorianLeapYear(1900) -> false
    // gregorianLeapYear(2000) -> true
    // gregorianLeapYear(2002) -> false
    // gregorianLeapYear(2004) -> true
    //
    // Ref.: (2.16)
    //
    var gregorianLeapYear = function(g_year){
        return (f.mod(g_year, 4) === 0) && (f.mod(g_year, 100) !== 0 || f.mod(g_year, 400) === 0);
    }

    // Number of days since the beginning of the epoch until the date
    //
    // Usage:
    //  fixedFromGregorian([1945, 11, 12]) -> 710347
    //
    // Ref.: (2.17)
    //
    var fixedFromGregorian = function(g_date){
        var x;
        x = k.GREGORIAN_EPOCH - 1 + 365 * (g_date[0] - 1) + f.floor((g_date[0] - 1) / 4) - f.floor((g_date[0] - 1) / 100) + f.floor((g_date[0] - 1) / 400) + f.floor((367 * g_date[1] - 362) / 12) + g_date[2];
        if (g_date[1] <= 2) {
          return x;
        } else if (gregorianLeapYear(g_date[0])) {
          return (x - 1);
        }
        else {
          return (x - 2);
        }
    }

    // Number of days since the beginning of the epoch until Jan, 1st of the year
    //
    // Usage:
    //  gregorianNewYear(1945) -> 710032
    //
    // Ref.: (2.18)
    //
    var gregorianNewYear = function(g_year){
        return fixedFromGregorian([g_year, k.JANUARY, 1]);
    }

    // Number of days since the beginning of the epoch until Dec, 31st of the year
    //
    // Usage:
    //  gregorianYearEnd(1945) -> 710396
    //
    // Ref.: (2.19)
    //
    var gregorianYearEnd = function(g_year){
        return fixedFromGregorian([g_year, k.DECEMBER, 31]);
    }

    //
    // Usage:
    //
    // Ref.: (2.20)
    //
    var gregorianYearRange = function(g_year){
        return [gregorianNewYear(g_year), gregorianYearEnd(g_year)];
    }

    //
    // Usage:
    //
    // Ref.: (2.21)
    //
    var gregorianYearFromFixed = function(g_date){
        var d0   = g_date - k.GREGORIAN_EPOCH;
        var n400 = f.floor(d0 / 146097);
        var d1   = f.mod(d0, 146097);
        var n100 = f.floor(d1 / 36524);
        var d2   = f.mod(d1, 36524);
        var n4   = f.floor(d2 / 1461);
        var d3   = f.mod(d2, 1461);
        var n1   = f.floor(d3 / 365);
        var year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
        if ((n100 === 4) || (n1 === 4)){
          return (year);
        } else {
          return (year + 1);
        }
    }

    //
    // Usage:
    //  gregorianFromFixed(736416) -> [2017, 3, 28]
    //
    // Ref.: (2.23)
    //
    var gregorianFromFixed = function(g_date){
        var correction;
        var year       = gregorianYearFromFixed(g_date);
        var priorDays  = g_date - gregorianNewYear(year);
        if (g_date < fixedFromGregorian([year, k.MARCH, 1])){
          correction = 0;
        } else if (gregorianLeapYear(year)){
            correction = 1;
        } else {
            correction = 2;
        }
        var month = f.floor(1 / 367 * (12 * (priorDays + correction) + 373));
        var day   = 1 + g_date - fixedFromGregorian([year, month, 1]);
        return ([year, month, day]);
    }

    //
    // Usage:
    //  gregorianDateDifference([2017,1,1],[2017,1,31]) -> 30
    //
    // Ref.: (2.24)
    //
    var gregorianDateDifference = function(g_date1, g_date2){
        return (fixedFromGregorian(g_date2) - fixedFromGregorian(g_date1));
    }

    // Corresponding day number of the date
    //
    // Usage:
    //  dayNumber([2017,12,20]) -> 354
    //  dayNumber([2017, 1,20]) -> 20
    //
    // Ref.: (2.25)
    //
    var dayNumber = function(g_date){
        return gregorianDateDifference(gregorianFromFixed(gregorianYearEnd(g_date[0] - 1, g_date[1], g_date[2])), g_date);
    }

    // Days remaining for the year end
    //
    // Usage:
    //  daysRemaining([2017, 12, 20]) -> 11
    //
    // Ref.: (2.26)
    //
    var daysRemaining = function(g_date){
        return gregorianDateDifference(g_date, gregorianFromFixed(gregorianYearEnd(g_date[0])));
    }

    // Public API - functions, varaibles and constanst to be exposed

    cg.gregorianLeapYear       = gregorianLeapYear;
    cg.fixedFromGregorian      = fixedFromGregorian;
    cg.gregorianNewYear        = gregorianNewYear;
    cg.gregorianYearEnd        = gregorianYearEnd;
    cg.gregorianYearRange      = gregorianYearRange;
    cg.gregorianYearFromFixed  = gregorianYearFromFixed;
    cg.gregorianFromFixed      = gregorianFromFixed;
    cg.gregorianDateDifference = gregorianDateDifference;
    cg.dayNumber               = dayNumber;
    cg.daysRemaining           = daysRemaining;

    return cg;

});