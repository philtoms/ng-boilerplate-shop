/**
 * This module is used in development to mock $http calls
 */
angular.module( 'ngBoilerplate.dev', [ 'ngBoilerplate', 'ngMockE2E' ]);

/**
 * This is where you store `$httpBackend.when()` calls
 * to go with your app's `$http` calls.
 */
angular.module( 'ngBoilerplate' ).run( function ( $httpBackend ) {
  $httpBackend.when( 'POST', '/login' ).respond( function () {
    return [204, '', {}];
  });
})

;