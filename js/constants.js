// constants.js

define('constants',[], function(){
    
    // Force strict mode
    'use strict';    
    
    var k = {};
    
    // ***********************************************
    //   G E N E R A L   I N F O   C O N S T A N T S
    // ***********************************************

    k.author = "R.N. Cernic";
    k.copyright = "2017 - all rights reserved";
    k.version = "0.4";
    k.license = "Licensed under Apache 2.0";

    // ***********************************
    //   G L O B A L   C O N S T A N T S
    // ***********************************

    k.BOGUS = "bogus";

    // Epochs (Rata Die)
    //

    // Noon, November 24, -4713 (Gregorian) & Noon, January 1, 4713 BCE (Julian)
    // Ref.: (1.3 & table 1.2)
    k.JD_EPOCH              = -1721424.5;

    // September 7, -3760 (Gregorian) & October 7, 3761 BCE (Julian)
    // Ref.: ( & table 1.2)
    k.HEBREW_EPOCH          = -1373472;

    // August 11, -3113 (Gregorian) & September 6, 3114 BCE (Julian)
    // Ref.: ( & table 1.2)
    k.MAYAN_EPOCH           = -1137142;

    // January 23, -3101 (Gregorian) & February 18, 3102 BCE (Julian)
    // Ref.: ( & table 1.2)
    k.HINDU_KALI_YUGA_EPOCH = -1132959;

    // February 15, -2636 (Gregorian) & March 8, 2637 BCE (Julian)
    // Ref.: ( & table 1.2)
    k.CHINESE_EPOCH         = -963099;

    // February 18, -746 (Gregorian) & February 26, 747 BCE (Julian)
    // Ref.: (1.38 & table 1.2)
    k.EGYPTIAN_EPOCH        = -272787;

    // December 7, -127 (Gregorian) & December 10, 128 BCE (Julian)
    // Ref.: ( & table 1.2)
    k.TIBETAN_EPOCH         = -46410;

    // December 30, 0 (Gregorian) & January 1, 1 CE (Julian)
    // Ref.: ( & table 1.2)
    k.JULIAN_EPOCH          = -1;

    // January 1, 1 (Gregorian) & January 3, 1 CE (Julian)
    // Ref.: ( 2.3 & table 1.2)
    k.GREGORIAN_EPOCH       = 1;

    // January 1, 1 (Gregorian) & January 3, 1 CE (Julian)
    // Ref.: ( & table 1.2)
    k.ISO_EPOCH             = 1;

    // August 27, 8 (Gregorian) & August 29, 8 CE (Julian)
    // Ref.: ( & table 1.2)
    k.ETHIOPIC_EPOCH        = 2796;

    // August 29, 284 (Gregorian) & August 29, 284 CE (Julian)
    // Ref.: ( & table 1.2)
    k.COPTIC_EPOCH          = 103605;

    // July 13, 552 (Gregorian) & July 11, 552 CE (Julian)
    // Ref.: (1.41 & table 1.2)
    k.ARMENIAN_EPOCH        = 201443;

    // March 22, 622 (Gregorian) & March 19, 622 CE (Julian)
    // Ref.: ( & table 1.2)
    k.PERSIAN_EPOCH         = 226896;

    // July 19, 622 (Gregorian) & July 16, 622 CE (Julian)
    // Ref.: ( & table 1.2)
    k.ISLAMIC_EPOCH         = 227015;

    // June 19, 632 (Gregorian) & June 16, 632 CE (Julian)
    // Ref.: ( & table 1.2)
    k.ZOROASTRIAN_EPOCH     = 230638;

    // September 22, 1792 (Gregorian) & September 11, 1792 CE (Julian)
    // Ref.: ( & table 1.2)
    k.FRENCH_REV_EPOCH     = 654415;

    // March 21, 1844 (Gregorian) & March 9, 1844 CE (Julian)
    // Ref.: ( & table 1.2)
    k.BAHAI_EPOCH           = 673222;

    // November 17, 1858 (Gregorian) & November 5, 1858 CE (Julian)
    // Ref.: (1.6 & table 1.2)
    k.MJD_EPOCH             = 678576;

    // January 1, 1970 (Gregorian)
    // Ref.: ()
    k.UNIX_EPOCH            = 719163;

    // Days of week
    //
    k.SUNDAY    = 0;
    k.MONDAY    = 1;
    k.TUESDAY   = 2;
    k.WEDNESDAY = 3;
    k.THURSDAY  = 4;
    k.FRIDAY    = 5;
    k.SATURDAY  = 6;

    k.DoW       = [
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
    k.JANUARY   = 1;
    k.FEBRUARY  = 2;
    k.MARCH     = 3;
    k.APRIL     = 4;
    k.MAY       = 5;
    k.JUNE      = 6;
    k.JULY      = 7;
    k.AUGUST    = 8;
    k.SEPTEMBER = 9;
    k.OCTOBER   = 10;
    k.NOVEMBER  = 11;
    k.DECEMBER  = 12;
    
    return k;
    
});