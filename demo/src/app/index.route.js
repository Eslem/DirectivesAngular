(function() {
  'use strict';

  angular
  .module('src')
  .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('form', {
      url: '/form',
      templateUrl: 'app/form/form.html',
      controller: 'FormController',
      controllerAs: 'form'
    })  .state('images', {
      url: '/images',
      templateUrl: 'app/images/images.html',
      controller: 'ImagesController'
    })
    ;

    $urlRouterProvider.otherwise('/');
  }

})();
