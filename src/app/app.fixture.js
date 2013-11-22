/**
 * This module is used in development to mock $http calls
 */
angular.module( 'ngBoilerplateShop.dev', [ 'ngBoilerplateShop', 'ngMockE2E' ]);

/**
 * This is where you store `$httpBackend.when()` calls
 * to go with your app's `$http` calls.
 */
angular.module( 'ngBoilerplateShop' ).run( function ( $httpBackend ) {
  $httpBackend.when( 'POST', '/login' ).respond( function () {
    return [204, '', {}];
  });
})

;