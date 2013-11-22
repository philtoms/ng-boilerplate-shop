describe( 'Admin', function() {

  beforeEach( module( 'ngbps.admin' ) );

  describe( 'filter', function() {

    var filter;
    beforeEach( inject( function( adminFilter ) {
      filter = adminFilter;
    }));

    it( 'should parse admin keys', inject( function() {
      expect( filter('salesphone') ).toEqual('0800 169 1106');
    }));
  });
});
