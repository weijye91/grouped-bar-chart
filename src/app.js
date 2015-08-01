angular.module('app', []); // Instantiate the module

angular.module('app', [
    'app.home',
    'app.about',
    'ngNewRouter'
    ])
  .controller('AppController', ['$router', AppController]);

function AppController($router) {
  $router.config([
    { path: '/', redirectTo: 'home' },
    { path: '/home', component: 'home' },
    { path: '/about', component: 'about' },
  ]);
}