/**
 * Workaround to make defining and retrieving angular modules easier and more intuitive.
 * http://www.hiddentao.com/archives/2013/11/04/an-improved-angular-module-split-your-modules-into-multiple-files/
 */
  
// (function(angular) {
//   var origMethod = angular.module;
  
//   var alreadyRegistered = {};
  
//   *
//    * Register/fetch a module.
//    *
//    * @param name {string} module name.
//    * @param reqs {array} list of modules this module depends upon.
//    * @param configFn {function} config function to run when module loads (only applied for the first call to create this module).
//    * @returns {*} the created/existing module.
   
//   angular.module = function(name, reqs, configFn) {
//    reqs = reqs || [];
//    var module = null;
  
//     if (alreadyRegistered[name]) {
//       module = origMethod(name);
//       module.requires.push.apply(module.requires, reqs);
//     } else {
//       module = origMethod(name, reqs, configFn);
//       alreadyRegistered[name] = module;
//     }
  
//     return module;
//   };
  
// })(angular);

angular.module( 'ngBoilerplateShop', [
  'ui.bootstrap',
  'ui.router',
  'ngSanitize',
  'templates-app',
  'templates-common',
  'ngbps.home',
  'ngbps.product',
  'ngbps.shopGateway',
  'ngbps.shopDB',
  'ngbps.search',
  'jsonRepository',
  'shoppingCart',
  'placeholders'
])

.config( function myAppConfig ( $urlRouterProvider ) {
//  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( Admin, ShoppingCart, Checkout) {
  Admin.get('rates').then(function(data){
    ShoppingCart.setTax(data);
    Checkout.setRates(data);
  });
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, Admin, Search ) {
  $scope.admin = Admin;
  $scope.search = Search;
  $scope.app={title:'ngBoilerplateShop'};
})


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
