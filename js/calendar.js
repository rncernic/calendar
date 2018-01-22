// calendar.js

/*--------------------------------------------------------------------------------
Calendrical Calculations
R. N. Cernic - 2017
License Apache 2.0

Adapted from:
Dershowitx, N. and Reingold, E. M. Calendrical Calsculations, Third Edition,
  Cambridge University Press, 2008 - ISBN 978-0-521-70238-6

Version history:

0.1 - 2017.03.25 (INTERNAL - Not Released)

 - Auxiliary math functions (gcd, lcm, sum and mod)
 - Julian
 - Modified Julian
 - Egyptian
 - Armenian
 - Gregorian

0.2 - 2017.03.28 (INTERNAL - Not Released)

 - Export to CSV through web browser
 - Function to check date validity for Julian, Modified Julian, Egyptian, Armenian and Gregorian

0.3 - 2017.06.17 (INTERNAL - Not Released)

 - Revealing Module pattern conversion
 - License Apache 2.0
 - RequireJS implementation (first steps)

--------------------------------------------------------------------------------*/

define('calendar', [] , function(window) {

    // Force strict mode
    'use strict';

    // Variable to hold the API
    var cc = {};
    
    // ***********************************************
    //   G E N E R A L   I N F O   C O N S T A N T S
    // ***********************************************

    const author = "R.N. Cernic";
    const copyright = "2017 - all rights reserved";
    const version = "0.3";
    const license = "Licensed under Apache 2.0";

    // ***********************************
    //   G L O B A L   C O N S T A N T S
    // ***********************************

    const BOGUS = "bogus";

    // Epochs (Rata Die)
    //

    // Noon, November 24, -4713 (Gregorian) & Noon, January 1, 4713 BCE (Julian)
    // Ref.: (1.3 & table 1.2)
    const JD_EPOCH              = -1721424.5;

    // September 7, -3760 (Gregorian) & October 7, 3761 BCE (Julian)
    // Ref.: ( & table 1.2)
    const HEBREW_EPOCH          = -1373472;

    // August 11, -3113 (Gregorian) & September 6, 3114 BCE (Julian)
    // Ref.: ( & table 1.2)
    const MAYAN_EPOCH           = -1137142;

    // January 23, -3101 (Gregorian) & February 18, 3102 BCE (Julian)
    // Ref.: ( & table 1.2)
    const HINDU_KALI_YUGA_EPOCH = -1132959;

    // February 15, -2636 (Gregorian) & March 8, 2637 BCE (Julian)
    // Ref.: ( & table 1.2)
    const CHINESE_EPOCH         = -963099;

    // February 18, -746 (Gregorian) & February 26, 747 BCE (Julian)
    // Ref.: (1.38 & table 1.2)
    const EGYPTIAN_EPOCH        = -272787;

    // December 7, -127 (Gregorian) & December 10, 128 BCE (Julian)
    // Ref.: ( & table 1.2)
    const TIBETAN_EPOCH         = -46410;

    // December 30, 0 (Gregorian) & January 1, 1 CE (Julian)
    // Ref.: ( & table 1.2)
    const JULIAN_EPOCH          = -1;

    // January 1, 1 (Gregorian) & January 3, 1 CE (Julian)
    // Ref.: ( 2.3 & table 1.2)
    const GREGORIAN_EPOCH       = 1;

    // January 1, 1 (Gregorian) & January 3, 1 CE (Julian)
    // Ref.: ( & table 1.2)
    const ISO_EPOCH             = 1;

    // August 27, 8 (Gregorian) & August 29, 8 CE (Julian)
    // Ref.: ( & table 1.2)
    const ETHIOPIC_EPOCH        = 2796;

    // August 29, 284 (Gregorian) & August 29, 284 CE (Julian)
    // Ref.: ( & table 1.2)
    const COPTIC_EPOCH          = 103605;

    // July 13, 552 (Gregorian) & July 11, 552 CE (Julian)
    // Ref.: (1.41 & table 1.2)
    const ARMENIAN_EPOCH        = 201443;

    // March 22, 622 (Gregorian) & March 19, 622 CE (Julian)
    // Ref.: ( & table 1.2)
    const PERSIAN_EPOCH         = 226896;

    // July 19, 622 (Gregorian) & July 16, 622 CE (Julian)
    // Ref.: ( & table 1.2)
    const ISLAMIC_EPOCH         = 227015;

    // June 19, 632 (Gregorian) & June 16, 632 CE (Julian)
    // Ref.: ( & table 1.2)
    const ZOROASTRIAN_EPOCH     = 230638;

    // September 22, 1792 (Gregorian) & September 11, 1792 CE (Julian)
    // Ref.: ( & table 1.2)
    const FRENCH_REV_EPOCH     = 654415;

    // March 21, 1844 (Gregorian) & March 9, 1844 CE (Julian)
    // Ref.: ( & table 1.2)
    const BAHAI_EPOCH           = 673222;

    // November 17, 1858 (Gregorian) & November 5, 1858 CE (Julian)
    // Ref.: (1.6 & table 1.2)
    const MJD_EPOCH             = 678576;

    // January 1, 1970 (Gregorian)
    // Ref.: ()
    const UNIX_EPOCH            = 719163;

    // Days of week
    //
    const SUNDAY    = 0;
    const MONDAY    = 1;
    const TUESDAY   = 2;
    const WEDNESDAY = 3;
    const THURSDAY  = 4;
    const FRIDAY    = 5;
    const SATURDAY  = 6;

    const DoW       = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Months
    //
    const JANUARY   = 1;
    const FEBRUARY  = 2;
    const MARCH     = 3;
    const APRIL     = 4;
    const MAY       = 5;
    const JUNE      = 6;
    const JULY      = 7;
    const AUGUST    = 8;
    const SEPTEMBER = 9;
    const OCTOBER   = 10;
    const NOVEMBER  = 11;
    const DECEMBER  = 12;

    // ***********************************
    //   G L O B A L   V A R I A B L E S
    // ***********************************

    // Sample RD data to test all calendars
    // Ref.: Appendix C - page 441
    //
    var sampleRDData = [
    -214193,
    -61387,
    25469,
    49217,
    171307,
    210155,
    253427,
    369740,
    400085,
    434355,
    452605,
    470160,
    473837,
    507850,
    524156,
    544676,
    567118,
    569477,
    601716,
    613424,
    626596,
    645554,
    664224,
    671401,
    694799,
    704424,
    708842,
    709409,
    709580,
    727274,
    728714,
    744313,
    764652
    ];

    //
    var calendarData = [];


    // *********************************************************
    //   A U X I L I A R Y   G E N E R A L   F U N C T I O N S
    // *********************************************************

    // Generates info for all calendars, based on an array of RD,
    // to be compared with the table in Appendix C
    //
    var reportCalendarsFromRD = function(){
        var rdData = sampleRDData;
        rdData.forEach (function(entry){
          calendarData.push({
              a_RD        : entry,
              b_DoW       : DoW[dayOfWeekFromFixed(entry)],
              c_JD        : jdFromFixed(entry),
              d_MJD       : mjdFromFixed(entry),
              e_Egyptian  : egyptianFromFixed(entry),
              f_Armenian  : armenianFromFixed(entry),
              g_Gregorian : gregorianFromFixed(entry),
          });
        })
        return calendarData;
    };

    //
    //
    // Usage:
    //
    function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data === null || !data.length) {
          return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
          ctr = 0;
          keys.forEach(function(key) {
              if (ctr > 0) result += columnDelimiter;

              result += item[key];
              ctr++;
          });
          result += lineDelimiter;
        });

        return result;
    }

    //
    //
    // Usage:
    //
    function downloadCSV(args) {
        var data, filename, link;

        reportCalendarsFromRD();

        var csv = convertArrayOfObjectsToCSV({
          data: calendarData
        });
        if (csv === null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }


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
        }
        else if (condition(mid)){
            return binarySearch(low, mid, dir, condition);
        }
        else {
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
        return mod((date - SUNDAY), 7);
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

    // ----------
    //   Julian
    // ----------

    //
    // Usage:
    //
    // Ref.: (1.4)
    //
    var momentFromJD = function(jd){
        return (jd + JD_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.5)
    //
    var jdFromMoment = function(t){
        return (t - JD_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.10)
    //
    var fixedFromJD = function(jd){
        return (floor(momentFromJD(jd)));
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


    // -------------------
    //   Modified Julian
    // -------------------

    //
    // Usage:
    //
    // Ref.: (1.7)
    //
    var fixedFromMJD = function(mjd){
        return (mjd + MJD_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.8)
    //
    var mjdFromFixed = function(date){
        return (date - MJD_EPOCH);
    }

    // Check validity of a MJD date
    //
    // Usage:
    //
    var validMJDDate = function(mjdDate){
        return (mjdDate === mjdFromFixed(fixedFromMJD(mjdDate)));
    }


    // ------------
    //   Egyptian
    // ------------

    //
    // Usage:
    //
    // Ref.: (1.39)
    //
    var fixedFromEgyptian = function(year, month, day){
        return (EGYPTIAN_EPOCH + 365 * (year - 1) + 30 * (month - 1) + day - 1);
    }

    //
    // Usage:
    //
    // Ref.: (1.40)
    //
    var egyptianFromFixed = function(date){
        var days  = date - EGYPTIAN_EPOCH;
        var year  = floor(days / 365) + 1;
        var month = floor(mod(days, 365) / 30) + 1;
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


    // ------------
    //   Armenian
    // ------------

    //
    // Usage:
    //
    // Ref.: (1.42)
    //
    var fixedFromArmenian = function(year, month, day){
        return (ARMENIAN_EPOCH + fixedFromEgyptian(year, month, day) - EGYPTIAN_EPOCH);
    }

    //
    // Usage:
    //
    // Ref.: (1.43)
    //
    var armenianFromFixed = function(date){
        return egyptianFromFixed(date + EGYPTIAN_EPOCH - ARMENIAN_EPOCH);
    }

    // Check validity of an Armenian date
    //
    // Usage:
    // validArmenianDate([yyy, mm, dd]) -> True or False
    //
    var validArmenianDate = function(armenianDate){
        return (armenianDate === armenianFromFixed(fixedFromArmenian(armenianDate[0], armenianDate[1],armenianDate[2])));
    }


    // -------------
    //   Gregorian
    // -------------

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
        return (mod(g_year, 4) === 0) && (mod(g_year, 100) !== 0 || mod(g_year, 400) === 0);
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
        x = GREGORIAN_EPOCH - 1 + 365 * (g_date[0] - 1) + Math.floor((g_date[0] - 1) / 4) - floor((g_date[0] - 1) / 100) + floor((g_date[0] - 1) / 400) + floor((367 * g_date[1] - 362) / 12) + g_date[2];
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
        return fixedFromGregorian([g_year, JANUARY, 1]);
    }

    // Number of days since the beginning of the epoch until Dec, 31st of the year
    //
    // Usage:
    //  gregorianYearEnd(1945) -> 710396
    //
    // Ref.: (2.19)
    //
    var gregorianYearEnd = function(g_year){
        return fixedFromGregorian([g_year, DECEMBER, 31]);
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
        var d0   = g_date - GREGORIAN_EPOCH;
        var n400 = floor(d0 / 146097);
        var d1   = mod(d0, 146097);
        var n100 = floor(d1 / 36524);
        var d2   = mod(d1, 36524);
        var n4   = floor(d2 / 1461);
        var d3   = mod(d2, 1461);
        var n1   = floor(d3 / 365);
        var year = 400 * n400 + 100 * n100 + 4 * n4 + n1;
        if ((n100 === 4) || (n1 === 4)){
          return (year);
        }
        else {
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
        if (g_date < fixedFromGregorian([year, MARCH, 1])){
          correction = 0;
        }
        else if (gregorianLeapYear(year)){
          correction = 1;
        } else {
          correction = 2;
        }
        var month = floor(1 / 367 * (12 * (priorDays + correction) + 373));
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

    // ----------------------
    //   Gregorian holidays
    // ----------------------

    //
    // Usage:
    //
    // Ref.: (2.31)
    //
    var independenceDayUS = function(g_year){
        return fixedFromGregorian([g_year, JULY, 4]);
    }

    //
    // Usage:
    //
    // Ref.: ()
    //
    var independenceDayBR = function(g_year){
        return fixedFromGregorian([g_year, SEPTEMBER, 7]);
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
            return 7 * n + kdayBefore(k, fixedFromGregorian(g_date));
        }
        else {
            return 7 * n +kdayAfter(k, fixedFromGregorian(g_date));
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
        return firstKday(MONDAY, [g_year, SEPTEMBER, 1]);
    }

    //
    //
    // Usage:
    //
    // Ref.: ()
    //
    var laborDayBR = function(g_year){
        return fixedFromGregorian([g_year, MAY, 1]);
    }

    // Gives the fixed date (RD) of the US Memrial Day that occurs on the last Monday
    // of May, or the last Monday before May 31st
    //
    // Usage:
    //
    // Ref.: (2.36)
    //
    var memorialDayUS = function(g_year){
        return lastKday(MONDAY, [g_year, MAY, 31]);
    }
    
    //
    //
    // Usage:
    //
    // Ref.: (2.37)
    //
    var electionDayUS = function(g_yer){
        return firstKday(TUESDAY, [g_yer, NOVEMBER, 2]);
    }

    //
    //
    // Usage:
    //
    // Ref.: (2.38)
    //
    var daylightSavingStart = function(g_year){
        return nthKday(2, SUNDAY, [g_year, MARCH, 1]);
    }

    //
    //
    // Usage:
    //
    // Ref.: (2.39)
    //
    var daylightSavingEnd = function(g_year){
        return nthKday(SUNDAY, [g_year, NOVEMBER, 1]);
    }

    //
    //
    // Usage:
    //
    // Ref.: (2.40)
    //
    var christmas = function(g_year){
        return fixedFromGregorian([g_year, DECEMBER, 25]);
    }
    
    //
    //
    // Usage:
    //
    // Ref.: (2.41)
    //
    var advent = function(g_year){
        return kdayNearest(SUNDAY, fixedFromGregorian([g_year, NOVEMBER, 30]));
    }
    
    //
    //
    // Usage:
    //
    // Ref.: (2.42)
    //
    var epiphanyUS = function(g_year){
        return firstKday(SUNDAY, [g_year, JANUARY, 2]);
    }
    
    //
    //
    // Usage:
    //
    // Ref.: ()
    //
    var epiphany = function(g_year){
        return fixedFromGregorian([g_year, JANUARY, 6]);
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

    // General info
    //
    cc.author                  = author;
    cc.copyright               = copyright;
    cc.version                 = version;
    cc.license                 = license;    

    // Constants
    //
    cc.SUNDAY                  = SUNDAY;
    cc.MONDAY                  = MONDAY;
    cc.TUESDAY                 = TUESDAY;
    cc.WEDNESDAY               = WEDNESDAY;
    cc.THURSDAY                = THURSDAY;
    cc.FRIDAY                  = FRIDAY;
    cc.SATURDAY                = SATURDAY;
    
    cc.JANUARY                 = JANUARY;
    cc.FEBRUARY                = FEBRUARY;
    cc.MARCH                   = MARCH;
    cc.APRIL                   = APRIL;
    cc.MAY                     = MAY;
    cc.JUNE                    = JUNE;
    cc.JULY                    = JULY;
    cc.AUGUST                  = AUGUST;
    cc.SEPTEMBER               = SEPTEMBER;
    cc.OCTOBER                 = OCTOBER;
    cc.NOVEMBER                = NOVEMBER;
    cc.DECEMBER                = DECEMBER;

    // Epochs
    //    
    cc.JD_EPOCH                = JD_EPOCH;
    cc.HEBREW_EPOCH            = HEBREW_EPOCH;
    cc.MAYAN_EPOCH             = MAYAN_EPOCH;
    cc.HINDU_KALI_YUGA_EPOCH   = HINDU_KALI_YUGA_EPOCH;
    cc.CHINESE_EPOCH           = CHINESE_EPOCH;
    cc.EGYPTIAN_EPOCH          = EGYPTIAN_EPOCH;
    cc.TIBETAN_EPOCH           = TIBETAN_EPOCH;
    cc.JULIAN_EPOCH            = JULIAN_EPOCH;
    cc.GREGORIAN_EPOCH         = GREGORIAN_EPOCH;
    cc.ISO_EPOCH               = ISO_EPOCH;
    cc.ETHIOPIC_EPOCH          = ETHIOPIC_EPOCH;
    cc.COPTIC_EPOCH            = COPTIC_EPOCH;
    cc.ARMENIAN_EPOCH          = ARMENIAN_EPOCH;
    cc.PERSIAN_EPOCH           = PERSIAN_EPOCH;
    cc.ISLAMIC_EPOCH           = ISLAMIC_EPOCH;
    cc.ZOROASTRIAN_EPOCH       = ZOROASTRIAN_EPOCH;
    cc.FRENCH_REV_EPOCH        = FRENCH_REV_EPOCH;
    cc.BAHAI_EPOCH             = BAHAI_EPOCH;
    cc.MJD_EPOCH               = MJD_EPOCH;
    cc.UNIX_EPOCH              = UNIX_EPOCH;

    //
    //
    cc.DoW                     = DoW;

    // Functions
    //
    cc.downloadCSV             = downloadCSV;

    // Calendar functions
    //
    cc.rd                      = rd;
    cc.dayOfWeekFromFixed      = dayOfWeekFromFixed;
    cc.kdayOnOrBefore          = kdayOnOrBefore;
    cc.kdayOnOrAfter           = kdayOnOrAfter;
    cc.kdayNearest             = kdayNearest;
    cc.kdayBefore              = kdayBefore;
    cc.kdayAfter               = kdayAfter;
    //
    // Julian
    //
    cc.momentFromJD            = momentFromJD;
    cc.jdFromMoment            = jdFromMoment;
    cc.fixedFromJD             = jdFromMoment;
    cc.jdFromFixed             = jdFromFixed;
    cc.validJDDate             = validJDDate;
    //
    // Modified Julian
    //
    cc.fixedFromMJD            = fixedFromMJD;
    cc.mjdFromFixed            = mjdFromFixed;
    cc.validMJDDate            = validMJDDate;
    //
    // Egyptian
    //
    cc.fixedFromEgyptian       = fixedFromEgyptian;
    cc.egyptianFromFixed       = egyptianFromFixed;
    cc.validEgyptianDate       = validEgyptianDate;
    //
    // Armenian
    //
    cc.fixedFromArmenian       = fixedFromArmenian;
    cc.armenianFromFixed       = armenianFromFixed;
    cc.validArmenianDate       = validArmenianDate;
    //
    // Gregorian
    //
    cc.gregorianLeapYear       = gregorianLeapYear;
    cc.fixedFromGregorian      = fixedFromGregorian;
    cc.gregorianNewYear        = gregorianNewYear;
    cc.gregorianYearEnd        = gregorianYearEnd;
    cc.gregorianYearRange      = gregorianYearRange;
    cc.gregorianYearFromFixed  = gregorianYearFromFixed;
    cc.gregorianFromFixed      = gregorianFromFixed;
    cc.gregorianDateDifference = gregorianDateDifference;
    cc.dayNumber               = dayNumber;
    cc.daysRemaining           = daysRemaining;
    //
    // Gregorain holidays and special days
    //

    cc.independenceDayUS       = independenceDayUS;
    cc.independenceDayBR       = independenceDayBR;
    cc.nthKday                 = nthKday;
    cc.firstKday               = firstKday;
    cc.laborDayUS              = laborDayUS;
    cc.laborDayBR              = laborDayBR;
    cc.memorialDayUS           = memorialDayUS;
    cc.electionDayUS           = electionDayUS;
    cc.dayLightSavingStart     = daylightSavingStart;
    cc.dayLightSavingEnd       = daylightSavingEnd;
    cc.christmas               = christmas;
    cc.advent                  = advent;
    cc.epiphanyUS              = epiphanyUS;
    cc.epiphany                = epiphany;
    cc.unluckyFridaysInRange   = unluckyFridaysInRange;
    
    window.cc = cc;
    return cc;

}(window));
