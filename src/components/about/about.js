(function() {
  define([
      'angular'
  ], function() {
    angular.module('app.about', [])
        .controller('AboutController', [function () {
          console.log("AboutController Initiated");
          this.name = 'About';
        }]);
  });
})();