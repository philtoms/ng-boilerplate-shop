describe( 'Filters', function() {

  beforeEach( module( 'ngbps.filters' ) );

  describe( 'checkmark', function() {

    var checkmark;
    beforeEach( inject( function( checkmarkFilter ) {
      checkmark = checkmarkFilter;
    }));

    var tick = '\u2713';
    var cross = '\u2718';
    it( 'should return checkmark', function() {
      expect( checkmark(true) ).toBe(tick);
      expect( checkmark('X') ).toBe(tick);
      expect( checkmark(false) ).toBe(cross);
      expect( checkmark('') ).toBe(cross);
    });
  });

  describe( 'leadingZeros', function() {  describe( 'titlize', function() {

    var titlize;
    beforeEach( inject( function( titlizeFilter ) {
      titlize = titlizeFilter;
    }));

    it( 'should titlize strings', function() {
      expect( titlize('abc') ).toBe('Abc');
      expect( titlize('a b c') ).toBe('A b c');
      expect( titlize('A b c') ).toBe('A b c');
      expect( titlize('a BC') ).toBe('A BC');
    });
  });

  describe( 'leadingZeros', function() {

    var leadingZeros;
    beforeEach( inject( function( leadingZerosilter ) {
      leadingZeros = leadingZerosilter;
    }));

    it( 'should add expected leading zeros', function() {
      expect( leadingZeros('1') ).toBe('001');
      expect( leadingZeros('000001') ).toBe('001');
      expect( leadingZeros('0001') ).toBe('001');
      expect( leadingZeros('1',2) ).toBe('01');
    });
  });
});
