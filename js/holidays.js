// holidays.js

define('holidays', ['calendar'], function(c){
    
    var holidays = {};
    
    var christmas = function(g_year){
        return c.fixedFromGregorian([g_year, c.DECEMBER, 25]);
    }

    holidays.christmas = christmas;
    
    return holidays;
    
});