(function() {
  'use strict';

  angular
    .module('src')
    .controller('FormController', MainController);

  /** @ngInject */
  function MainController($scope) {
    $scope.file = {name:'No file selected'};
    $scope.picked = function(file){
      alert("File picked: "+file.name);
    }
  }
})();
