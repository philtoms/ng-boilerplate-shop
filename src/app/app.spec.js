describe( 'AppCtrl', function() {
  describe( 'isCurrentUrl', function() {
    var AppCtrl, $location, $scope;

    beforeEach( module( 'ngBoilerplate' ) );

    function wrappedInject(){
      try {
        inject( function( $controller, _$location_, $rootScope ) {
              $location = _$location_;
              $scope = $rootScope.$new();
              AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
            });
      }
      catch (Error){
        console.log(Error);
        throw Error;
      }
    }
    beforeEach( wrappedInject);

    it( 'should pass a dummy test', inject( function() {
      expect( AppCtrl ).toBeTruthy();
    }));
  });
});
