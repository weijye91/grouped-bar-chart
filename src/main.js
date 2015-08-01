(function() {
    'use strict';

    requirejs.config({
        baseUrl: '/',
        paths: {
            // Third party libraries.
            'angular': 'lib/angularjs/angular',
            'angular-new-router': 'lib/angular-new-router/router.es5.min',
            'd3': 'lib/d3/d3.min',

            // Our own written modules.
            'groupedBarChart': 'components/groupedBarChart/groupedBarChart',
            'bar': 'modules/bar/bar',
            'about': 'components/about/about',
            'home': 'components/home/home'
        },

        // Define dependencies here. Code Example:
        // 'about': ['angular', 'd3']
        shim: {
            'app': ['angular', 'angular-new-router', 'about', 'home'],
            'angular-new-router': ['angular'],
            'groupedBarChart': ['d3']
        },
        deps: ['app'],
        waitSeconds: 0
    });
})();
