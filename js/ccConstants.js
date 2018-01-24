// ccConstants.js

var ccConstants = {};

(function(){
    
    // Force strict mode
    'use strict';
    
    // ***********************************************
    //   G E N E R A L   I N F O   C O N S T A N T S
    // ***********************************************

    ccConstants.author = "R.N. Cernic";
    ccConstants.copyright = "2017 - all rights reserved";
    ccConstants.version = "0.4";
    ccConstants.license = "Licensed under Apache 2.0";

    // ***********************************
    //   G L O B A L   C O N S T A N T S
    // ***********************************

    ccConstants.BOGUS = "bogus";

    // Epochs (Rata Die)
    //

    // Noon, November 24, -4713 (Gregorian) & Noon, January 1, 4713 BCE (Julian)
    // Ref.: (1.3 & table 1.2)
    ccConstants.JD_EPOCH              = -1721424.5;

    // September 7, -3760 (Gregorian) & October 7, 3761 BCE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.HEBREW_EPOCH          = -1373472;

    // August 11, -3113 (Gregorian) & September 6, 3114 BCE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.MAYAN_EPOCH           = -1137142;

    // January 23, -3101 (Gregorian) & February 18, 3102 BCE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.HINDU_KALI_YUGA_EPOCH = -1132959;

    // February 15, -2636 (Gregorian) & March 8, 2637 BCE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.CHINESE_EPOCH         = -963099;

    // February 18, -746 (Gregorian) & February 26, 747 BCE (Julian)
    // Ref.: (1.38 & table 1.2)
    ccConstants.EGYPTIAN_EPOCH        = -272787;

    // December 7, -127 (Gregorian) & December 10, 128 BCE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.TIBETAN_EPOCH         = -46410;

    // December 30, 0 (Gregorian) & January 1, 1 CE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.JULIAN_EPOCH          = -1;

    // January 1, 1 (Gregorian) & January 3, 1 CE (Julian)
    // Ref.: ( 2.3 & table 1.2)
    ccConstants.GREGORIAN_EPOCH       = 1;

    // January 1, 1 (Gregorian) & January 3, 1 CE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.ISO_EPOCH             = 1;

    // August 27, 8 (Gregorian) & August 29, 8 CE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.ETHIOPIC_EPOCH        = 2796;

    // August 29, 284 (Gregorian) & August 29, 284 CE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.COPTIC_EPOCH          = 103605;

    // July 13, 552 (Gregorian) & July 11, 552 CE (Julian)
    // Ref.: (1.41 & table 1.2)
    ccConstants.ARMENIAN_EPOCH        = 201443;

    // March 22, 622 (Gregorian) & March 19, 622 CE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.PERSIAN_EPOCH         = 226896;

    // July 19, 622 (Gregorian) & July 16, 622 CE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.ISLAMIC_EPOCH         = 227015;

    // June 19, 632 (Gregorian) & June 16, 632 CE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.ZOROASTRIAN_EPOCH     = 230638;

    // September 22, 1792 (Gregorian) & September 11, 1792 CE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.FRENCH_REV_EPOCH     = 654415;

    // March 21, 1844 (Gregorian) & March 9, 1844 CE (Julian)
    // Ref.: ( & table 1.2)
    ccConstants.BAHAI_EPOCH           = 673222;

    // November 17, 1858 (Gregorian) & November 5, 1858 CE (Julian)
    // Ref.: (1.6 & table 1.2)
    ccConstants.MJD_EPOCH             = 678576;

    // January 1, 1970 (Gregorian)
    // Ref.: ()
    ccConstants.UNIX_EPOCH            = 719163;

    // Days of week
    //
    ccConstants.SUNDAY    = 0;
    ccConstants.MONDAY    = 1;
    ccConstants.TUESDAY   = 2;
    ccConstants.WEDNESDAY = 3;
    ccConstants.THURSDAY  = 4;
    ccConstants.FRIDAY    = 5;
    ccConstants.SATURDAY  = 6;

    ccConstants.DoW       = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    // Months
    //
    ccConstants.JANUARY   = 1;
    ccConstants.FEBRUARY  = 2;
    ccConstants.MARCH     = 3;
    ccConstants.APRIL     = 4;
    ccConstants.MAY       = 5;
    ccConstants.JUNE      = 6;
    ccConstants.JULY      = 7;
    ccConstants.AUGUST    = 8;
    ccConstants.SEPTEMBER = 9;
    ccConstants.OCTOBER   = 10;
    ccConstants.NOVEMBER  = 11;
    ccConstants.DECEMBER  = 12;
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ccConstants;
      }
          
})();