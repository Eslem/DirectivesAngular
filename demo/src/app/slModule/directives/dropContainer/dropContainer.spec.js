'use strict';

describe('Directive: slDropContainer', function () {

  // load the directive's module and view
  beforeEach(module('sl-module.directives'));
  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<click-outside></click-outside>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the clickOutside directive');
  }));
});