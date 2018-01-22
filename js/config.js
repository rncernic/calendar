// config.js

requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: [
            'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min',
            'jquery.min'
        ],
        xlsx        : 'lib/xlsx.core.min',
        excelplus   : 'lib/excelplus-2.5.min',
        constants   : 'constants',
        cfunctions  : 'cfunctions',
        cgregorian  : 'cgregorian',
        carmenian   : 'carmenian',
        cegyptian   : 'cegyptian',
        cjulian     : 'cjulian',
        ccoptic     : 'ccoptic',
        ciso        : 'ciso',
        gholidays   : 'gholidays'
    } 
});

// 
require([
    'jquery',
    'xlsx',
    'excelplus',
    'constants',
    'cfunctions',
    'cgregorian',
    'carmenian',
    'cegyptian',
    'cjulian',
    'ccoptic',
    'ciso',
    'gholidays'
]);