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

.directive('noBubble', function() {
    return function(scope, el, attrs) {
        el.bind(attrs.noBubble, function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
    };
})

;
