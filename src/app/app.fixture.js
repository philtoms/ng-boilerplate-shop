/**
 * This module is used in development to mock $http calls
 */
angular.module( 'ngBoilerplateShop.dev', [ 'ngBoilerplateShop', 'ngMockE2E' ]);

/**
 * This is where you store `$httpBackend.when()` calls
 * to go with your app's `$http` calls.
 */
angular.module( 'ngBoilerplateShop' ).run( function ( $httpBackend ) {

  $httpBackend.when( 'GET', 'template.html' ).respond( '<div class="template">template</div>');

  $httpBackend.when( 'GET', 'assets/data/shop.json' ).respond( function () {
    return [200 /*<%= shopData %>*/];
  });

})

;