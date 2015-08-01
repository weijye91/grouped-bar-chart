(function() {
    'use strict';

    define([
        'angular',
        'home',
        'about'
    ], function() {
        var app = angular.module('app', [
            'app.home',
            'about',
            'ngNewRouter'
        ]);

        var appControllerInjectables = ['$router'];
        function appController($router) {
            $router.config([
                { path: '/', redirectTo: 'home' },
                { path: '/home', component: 'home' },
                { path: '/about', component: 'about' }
            ]);
        }

        app.controller('appController', appControllerInjectables.concat([appController]));

        return angular.bootstrap(document, ['app']); // Manually bootstrap angular, on Dom ready
    });
})();