(function() {
    'use strict';

    requirejs.config({
        baseUrl: '/',
        paths: {
            // Third party libraries.
            'angular': 'lib/angularjs/angular.min',
            'd3': 'lib/d3/d3.min',

            // Our own written modules.
            'groupedBarChart': 'components/groupedBarChart'
        },

        // Define dependencies here. Code Example:
        // 'about': ['angular', 'd3']
        shim: {
            'app': ['angular'],
            'groupedBarChart': ['d3']
        },
        deps: ['app']
    });
})();
