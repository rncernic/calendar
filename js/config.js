// config.js

requirejs.config({
    baseUrl: 'js',
    paths: {
        //jquery: [
        //    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
        //    'jquery.min'
        //]
        calendar: 'calendar',
        holidays: 'holidays'
    } 
});

// 
require([
    'calendar',
    'holidays'
]);