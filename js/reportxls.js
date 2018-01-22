// reportxls.js

// TODO: write module and test it

define('reportxls', ['excelplus'] , function(x) {

    // Force strict mode
    'use strict';

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

    var reportCalendarsFromRD = function(){
        var rdData = sampleRDData;
        rdData.forEach (function(entry){
          calendarData.push({
              a_RD        : entry,
              b_DoW       : k.DoW[dayOfWeekFromFixed(entry)],
              c_JD        : jdFromFixed(entry),
              d_MJD       : mjdFromFixed(entry),
              e_Egyptian  : egyptianFromFixed(entry),
              f_Armenian  : armenianFromFixed(entry),
              g_Gregorian : gregorianFromFixed(entry),
          });
        })
        return calendarData;
    };

    var excel = function(){
        var ep = new x.ExcelPlus();
        reportCalendarsFromRD();
        ep.createFile("Calendrical calc")
        .write({ "content":[ ["RD","DoW"] ] })
        .write({ "sheet":"Book1", "cell":"A2", "content":calendarData[0] })
        .saveAs("demo.xlsx");
    };
    
    return excel;
    
});
