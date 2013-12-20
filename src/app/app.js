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
  /*
   * Main application features. Create new feature module folders
   * under /app and heference them here. (see the original home/README.md)
   */
  'ngbps.home',
  'ngbps.product',
  'ngbps.categories',
  'ngbps.information',
  'ngbps.reference',
  'ngbps.shopGateway',
  'ngbps.shopDB',
  'ngbps.search',
  
  /*
   * Drop-in components. Create new shared components in
   * the /common folder(see common/README.md)
   */
  'jsonRepository',
  'shoppingCart',
  'DISQUS',
  'Mailchimp',
  'placeholders',
  'utilities', // aka 'odds and sods'

  'angular-bootstrap-backfix',
  
  /*
   * Gateway proxy(ies) live in the /common/gateways folder.
   * Reference each of the gateways that the webste supports here.
   */
  'WorldPay',

  /* Infrastructure delivered through the tool chain. 
   * Add extra vendor components here and reference them in 
   * build.config.js to have them pulled into the deployment.
   */ 
  'ui.bootstrap',
  'ui.router',
  'ngAnimate',
  'ngSanitize',
  'ngSocial',
  'templates-app',
  'templates-common'
])

.config( function myAppConfig ( $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( Admin, ShoppingCart, Checkout) {
  Admin.get('rates').then(function(data){
    ShoppingCart.setTax(data);
    Checkout.setRates(data);
  });
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, Admin, Search ) {
  Admin.then(function(admin){
    $scope.admin = admin;
  });
  $scope.search = Search;
  $scope.app={title:'ngBoilerplateShop'};
})

.factory ('$animator', function AnimatorBackFill ($animate){
  return function(scope, attrs){

    return {
      enter:function(element,parent,after){
        $animate.enter(element,parent,after);
      },
      leave:function(element,parent,after){
        if (element.children().length){
          $animate.leave(element,after);
        }
      }
    };
  };

})

;
