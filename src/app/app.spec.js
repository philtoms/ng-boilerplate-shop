describe ('app', function() {
  
  beforeEach( module( 'ngBoilerplateShop' ) );

  describe( 'AppCtrl', function() {
    describe( 'isCurrentUrl', function() {
      var AppCtrl, $location, $scope;

      beforeEach( inject( function( $controller, _$location_, $rootScope ) {
        $location = _$location_;
        $scope = $rootScope.$new();
        AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
      }));

      xit( 'should pass a dummy test', inject( function() {
        expect( AppCtrl ).toBeTruthy();
      }));
    });
  });
  
});
