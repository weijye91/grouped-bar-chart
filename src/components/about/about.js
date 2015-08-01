(function() {
  'use strict';

  define([
      'angular'
  ], function() {
    var aboutModule = angular.module('about', []);

    var aboutControllerInjectables = [];
    function aboutController() {
      console.log("aboutController Initiated");
      var self = this;
      self.name = 'About';
    }

    aboutModule.controller('aboutController', aboutControllerInjectables.concat([aboutController]));

    return aboutModule;
  });
})();