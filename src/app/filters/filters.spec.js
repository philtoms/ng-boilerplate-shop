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

  describe( 'titlize', function() {

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

    it( 'should replace underscors and dashes with spaces', function() {
      expect( titlize('a_b_c') ).toBe('A b c');
      expect( titlize('a-b-c') ).toBe('A b c');
      expect( titlize('a-b_c') ).toBe('A b c');
    });

    it( 'should drop filetype suffixes', function() {
      expect( titlize('a.html') ).toBe('A');
      expect( titlize('a-b-c.html') ).toBe('A b c');
    });

    it( 'should drop leading protocol', function() {
      expect( titlize('http://a') ).toBe('A');
    });
  });

  describe( 'leadingZeros', function() {

    var leadingZeros;
    beforeEach( inject( function( leadingZerosFilter ) {
      leadingZeros = leadingZerosFilter;
    }));

    it( 'should add expected leading zeros', function() {
      expect( leadingZeros('1') ).toBe('001');
      expect( leadingZeros('000001') ).toBe('001');
      expect( leadingZeros('0001') ).toBe('001');
      expect( leadingZeros('1',2) ).toBe('01');
    });
  });
});
