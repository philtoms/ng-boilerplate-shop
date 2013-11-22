angular.module( 'ngBoilerplateShop', [
  'templates-app',
  'templates-common',
  'ngbps.home',
  'ngbps.admin',
  'ngbps.shoppingGateway',
  'shoppingCart',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | ngBoilerplateShop' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;

