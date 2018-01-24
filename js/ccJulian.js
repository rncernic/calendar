// ccJulian.js

// Dependencies
var ccConstants = ccConstants || require('./ccConstants');
var ccFunctions = ccFunctions || require('./ccFunctions');

// ----------
//   Julian
// ----------

var ccJulian = {};

(function(){
    // Force strict mode
    'use strict';

    //
    // Usage:
    //
    // Ref.: (1.4)
    //
    ccJulian.momentFromJD = function(jd){
        return (jd + ccConstants.JD_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.5)
    //
    ccJulian.jdFromMoment = function(t){
        return (t - ccConstants.JD_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.10)
    //
    ccJulian.fixedFromJD = function(jd){
        return (ccFunctions.floor(ccJulian.momentFromJD(jd)));
    }

    //
    // Usage:
    //
    // Ref.: (1.11)
    //
    ccJulian.jdFromFixed = function(date){
        return (ccJulian.jdFromMoment(date));
    }

    // Check validity of a JD date
    //
    // Usage:
    //
    ccJulian.validJDDate = function(jdDate){
        return (jdDate === ccJulian.jdFromFixed(ccJulian.fixedFromJD(jdDate)));
    }

    // Is a julian year leap?
    //
    // usage:
    //
    // Ref.: (3.1)
    //
    ccJulian.julianLeapYear = function(j_year){
        if (j_year > 0) {
            return (ccFunctions.mod(j_year, 4) === 0);
        } else {
            return (ccFunctions.mod(j_year, 4) === 3);
        }
    }

    // 
    //
    // usage:
    //
    // Ref.: (3.3)
    //
    ccJulian.fixedFromJulian = function(jdate){
        var j;
        var y = jdate[0];
        var m = jdate[1];
        var d = jdate[2];
        
        if (y < 0){
            y = y + 1;
        }
        
        j = ccConstants.JULIAN_EPOCH - 1 + 365 * (y - 1) + ccFunctions.floor((y - 1) / 4);
        j = j + ccFunctions.floor(1 / 12 * (367 * m - 362));
        
        if (m <= 2){
            j = j;
        } else if (ccJulian.julianLeapYear(y)) {
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
    ccJulian.fixedFromMJD = function(mjd){
        return (mjd + ccConstants.MJD_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.8)
    //
    ccJulian.mjdFromFixed = function(date){
        return (date - ccConstants.MJD_EPOCH);
    }

    // Check validity of a MJD date
    //
    // Usage:
    //
    ccJulian.validMJDDate = function(mjdDate){
        return (mjdDate === ccJulian.mjdFromFixed(ccJulian.fixedFromMJD(mjdDate)));
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ccJulian;
      }
          
})();