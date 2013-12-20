/**
 * angular-bootstrap-backfix
 * This component provides temporary backfix support for various bootstrap components
 * that are incompatible with angularjs > ~1.2 and / or bootstrap > ~3.0
 */
 angular.module( 'angular-bootstrap-backfix', [])

/**
 * https://github.com/angular-ui/bootstrap/issues/1273
 * ui bootstrap carousel animation angular 1.2.* issues
 */
.directive('slide', function ($animate) {
  return {
      restrict:'E',
      link: function ($scope, $element, $attrs) {
        $animate.enabled(false, $element.parent());
      }
  };
})

;