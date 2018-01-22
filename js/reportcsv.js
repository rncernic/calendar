// reportcsv.js

// TODO: write module and test it

define('reportcsv', [] , function() {

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

});
