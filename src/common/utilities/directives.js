angular.module( 'utilities.directives', [])

.directive('onBlur', ['$parse', function($parse) {
  return function(scope, element, attr) {
    var fn = $parse(attr['onBlur']);
    element.bind('blur', function(event) {
      scope.$apply(function() {
        fn(scope, {$event:event});
      });
    });
  };
}])

;
