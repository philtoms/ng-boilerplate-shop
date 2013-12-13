describe( 'utilities.filters', function() {

  beforeEach(module('utilities.filters'));

  describe( 'titlize', function() {

    var titlize;
    beforeEach( inject( function( titlizeFilter ) {
      titlize = titlizeFilter;
    }));

    it( 'should normalise empty input', function() {
      expect( titlize('') ).toBe('');
      expect( titlize(null) ).toBe('');
      expect( titlize() ).toBe('');
    });

    it( 'should capitalize the leading character', function() {
      expect( titlize('abc') ).toBe('Abc');
      expect( titlize('a b c') ).toBe('A b c');
      expect( titlize('A b c') ).toBe('A b c');
      expect( titlize('a BC') ).toBe('A BC');
    });

    it( 'should replace dashes with spaces', function() {
      expect( titlize('a-b-c') ).toBe('A b c');
      expect( titlize('a b-c') ).toBe('A b c');
    });

    it( 'should replace underscores with dashes', function() {
      expect( titlize('a_b_c') ).toBe('A-b-c');
      expect( titlize('a-b_c') ).toBe('A b-c');
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
