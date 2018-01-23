// gholidays.js

// TODO: unluckyFridaysInRange.

// ----------------------
//   Gregorian holidays
// ----------------------

define('gholidays', ['cgregorian', 'constants', 'cfunctions'], function(c, k, f){
    
    // Force strict mode
    'use strict';
    
    var h = {};
    
    //
    // Usage:
    //
    // Ref.: (2.31)
    //
    var independenceDayUS = function(g_year){
        return c.fixedFromGregorian([g_year, k.JULY, 4]);
    }

    //
    // Usage:
    //
    // Ref.: ()
    //
    var independenceDayBR = function(g_year){
        return c.fixedFromGregorian([g_year, k.SEPTEMBER, 7]);
    }

    // Gives RD for the nth k-day after or before a given Gregorian date (counting
    // backward when n < 0)
    //
    // Usage:
    //  First Sunday after Jan 1st, 2017 is RD 736337 = Jan 8th, 2017
    //  nthKday(1, SUNDAY, [2017, 1, 2]) = 736337
    //
    //  Second Monday before Jun 30th, 2017 is RD 736499 = Jun 19th, 2017
    //  nthKday(-2, MONDAY, [2017, 6, 30]) = 736499
    //
    // Ref.: (2.32)
    //
    var nthKday = function(n, k, g_date){
        if (n > 0) {
            return 7 * n + f.kdayBefore(k, c.fixedFromGregorian(g_date));
        } else {
            return 7 * n +f.kdayAfter(k, c.fixedFromGregorian(g_date));
        }
    }
    
    // Gives the fixed date (RD) of the first k-day on or after a Gregorian date
    //
    // Usage:
    //
    // Ref.: (2.33)
    //
    var firstKday = function(k, g_date){
        return nthKday(1, k, g_date);
    }
    
    // Gives the fixed date (RD) of the last k-day on or after a Gregorian date
    //
    // Usage:
    //
    // Ref.: (2.34)
    //
    var lastKday = function(k, g_date){
        return nthKday(-1, k, g_date);
    }
    
    // Gives the fixed date (RD) of the US Labor Day that occurs on the first Monday
    // in Sep, or the first Monday on or after Sep 1st
    //
    // Usage:
    //
    // Ref.: (2.35)
    //
    var laborDayUS = function(g_year){
        return firstKday(k.MONDAY, [g_year, k.SEPTEMBER, 1]);
    }

    //
    //
    // Usage:
    //
    // Ref.: ()
    //
    var laborDayBR = function(g_year){
        return c.fixedFromGregorian([g_year, k.MAY, 1]);
    }

    // Gives the fixed date (RD) of the US Memrial Day that occurs on the last Monday
    // of May, or the last Monday before May 31st
    //
    // Usage:
    //
    // Ref.: (2.36)
    //
    var memorialDayUS = function(g_year){
        return lastKday(k.MONDAY, [g_year, k.MAY, 31]);
    }
    
    //
    //
    // Usage:
    //
    // Ref.: (2.37)
    //
    var electionDayUS = function(g_yer){
        return firstKday(k.TUESDAY, [g_yer, k.NOVEMBER, 2]);
    }

    //
    //
    // Usage:
    //
    // Ref.: (2.38)
    //
    var daylightSavingStart = function(g_year){
        return nthKday(2, k.SUNDAY, [g_year, k.MARCH, 1]);
    }

    //
    //
    // Usage:
    //
    // Ref.: (2.39)
    //
    var daylightSavingEnd = function(g_year){
        return nthKday(k.SUNDAY, [g_year, k.NOVEMBER, 1]);
    }

    //
    //
    // Usage:
    //
    // Ref.: (2.40)
    //
    var christmas = function(g_year){
        return c.fixedFromGregorian([g_year, k.DECEMBER, 25]);
    }
    
    //
    //
    // Usage:
    //
    // Ref.: (2.41)
    //
    var advent = function(g_year){
        return c.kdayNearest(k.SUNDAY, c.fixedFromGregorian([g_year, k.NOVEMBER, 30]));
    }
    
    //
    //
    // Usage:
    //
    // Ref.: (2.42)
    //
    var epiphanyUS = function(g_year){
        return firstKday(k.SUNDAY, [g_year, k.JANUARY, 2]);
    }
    
    //
    //
    // Usage:
    //
    // Ref.: ()
    //
    var epiphany = function(g_year){
        return c.fixedFromGregorian([g_year, k.JANUARY, 6]);
    }

    //
    //
    // Usage:
    //
    // Ref.: (2.43)
    //
    var unluckyFridaysInRange = function(date1, date2){
        
    }

    // Public API - functions, varaibles and constanst to be exposed
    
    h.independenceDayUS     = independenceDayUS;
    h.independenceDayBR     = independenceDayBR;
    h.nthKday               = nthKday;
    h.firstKday             = firstKday;
    h.laborDayUS            = laborDayUS;
    h.laborDayBR            = laborDayBR;
    h.memorialDayUS         = memorialDayUS;
    h.electionDayUS         = electionDayUS;
    h.dayLightSavingStart   = daylightSavingStart;
    h.dayLightSavingEnd     = daylightSavingEnd;
    h.christmas             = christmas;
    h.advent                = advent;
    h.epiphanyUS            = epiphanyUS;
    h.epiphany              = epiphany;
    h.unluckyFridaysInRange = unluckyFridaysInRange;
    
    return h;
    
});