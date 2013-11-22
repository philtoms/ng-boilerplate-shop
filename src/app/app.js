angular.module( 'ngBoilerplateShop', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplateShop.admin',
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

