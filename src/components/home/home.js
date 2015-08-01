angular.module('app.home', [])
  .controller('HomeController', [function () {
  	console.log("HomeController Initiated");
    this.name = 'Home';
  }]);