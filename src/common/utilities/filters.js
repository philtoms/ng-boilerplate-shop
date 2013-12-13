angular.module( 'utilities.filters', [])

.filter('titlize', function() {
  return function(input) {
    if (!input) {
      return '';
    }
    input = input.replace(/\S+:\/\//g,'');
    return input.charAt(0).toUpperCase() + input.slice(1).replace(/-/g,' ').replace(/\.html/,'').replace(/_/g,'-');
  };
})

.filter('leadingZeros', function() {
  return function(input, size) {
    var s = "000000000" + input;
    return s.substr(s.length-(size||3));
  };
})

;
