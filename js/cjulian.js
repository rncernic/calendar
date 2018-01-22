// cjulian.js
   
// ----------
//   Julian
// ----------

define('cjulian', ['constants', 'cfunctions'] , function(k, f) {

    // Force strict mode
    'use strict';

    // Variable to hold the API
    var cj = {};
    //
    // Usage:
    //
    // Ref.: (1.4)
    //
    var momentFromJD = function(jd){
        return (jd + k.JD_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.5)
    //
    var jdFromMoment = function(t){
        return (t - k.JD_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.10)
    //
    var fixedFromJD = function(jd){
        return (f.floor(momentFromJD(jd)));
    }

    //
    // Usage:
    //
    // Ref.: (1.11)
    //
    var jdFromFixed = function(date){
        return (jdFromMoment(date));
    }

    // Check validity of a JD date
    //
    // Usage:
    //
    var validJDDate = function(jdDate){
        return (jdDate === jdFromFixed(fixedFromJD(jdDate)));
    }

    // Is a julian year leap?
    //
    // usage:
    //
    // Ref.: (3.1)
    //
    var julianLeapYear = function(j_year){
        if (j_year > 0) {
            return (f.mod(j_year, 4) === 0);
        } else {
            return (f.mod(j_year, 4) === 3);
        }
    }

    // 
    //
    // usage:
    //
    // Ref.: (3.3)
    //
    var fixedFromJulian = function(jdate){
        var j;
        var y = jdate[0];
        var m = jdate[1];
        var d = jdate[2];
        
        if (y < 0){
            y = y + 1;
        }
        
        j = k.JULIAN_EPOCH - 1 + 365 * (y - 1) + f.floor((y - 1) / 4);
        j = j + f.floor(1 / 12 * (367 * m - 362));
        
        if (m <= 2){
            j = j;
        } else if (julianLeapYear(y)) {
            j = j - 1;
        } else {
            j = j - 2;
        }
        
        j = j + d;
        
        return j;
    }

    // -------------------
    //   Modified Julian
    // -------------------

    //
    // Usage:
    //
    // Ref.: (1.7)
    //
    var fixedFromMJD = function(mjd){
        return (mjd + k.MJD_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.8)
    //
    var mjdFromFixed = function(date){
        return (date - k.MJD_EPOCH);
    }

    // Check validity of a MJD date
    //
    // Usage:
    //
    var validMJDDate = function(mjdDate){
        return (mjdDate === mjdFromFixed(fixedFromMJD(mjdDate)));
    }

    // Public API - functions, varaibles and constanst to be exposed
        
    cj.momentFromJD     = momentFromJD;
    cj.jdFromMoment     = jdFromMoment;
    cj.fixedFromJD      = fixedFromJD;
    cj.jdFromFixed      = jdFromFixed;
    cj.validJDDate      = validJDDate;
    cj.fixedFromMJD     = fixedFromMJD;
    cj.mjdFromFixed     = mjdFromFixed;
    cj.validMJDDate     = validMJDDate;
    cj.julianLeapYear   = julianLeapYear;
    cj.fixedFromJulian  = fixedFromJulian;

    return cj;
    
});