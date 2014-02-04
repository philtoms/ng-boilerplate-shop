describe( 'cartItem', function() {

  describe ('directive', function(){
    var $scope, $httpBackend, $element;
    var markup = '<cart-item></cart-item>';
    var directiveTpl = '<div class="cart-item"></div>';
    var cart = {};

    beforeEach( function(){
      module( 'ngbps.shopGateway', function($provide){
        $provide.factory('ShoppingCart', function(){return cart;});
      });
    });

    beforeEach( inject( function(_$httpBackend_,  $compile, $rootScope ) {
      $scope = $rootScope.$new();
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('shopGateway/cartItem.tpl.html').respond(directiveTpl);
      $element = $compile(markup)($scope);
    }));

    it( 'should bind to cart', inject( function() {
      $httpBackend.flush();
      expect( $scope.cart ).toEqual(cart);
    }));

    it( 'should inject html template', inject( function() {
      $httpBackend.flush();
      expect( $element[0].outerHTML ).toEqual(directiveTpl);
    }));
  });


  describe( 'itemCheckmark filter', function() {

    var checkmark;

    beforeEach(module( 'ngbps.shopGateway'));

    beforeEach( inject( function( itemCheckmarkFilter ) {
      checkmark = itemCheckmarkFilter;
    }));

    var tick1 = '\u27131';
    
    it( 'should return checkmark when unit count is > 0', function() {
      expect( checkmark(1) ).toBe(tick1);
    });

    it( 'should return empty string when unit count is < 1', function() {
      expect( checkmark(0) ).toBe('');
    });
  });

});
