describe( 'cartItem', function() {
  var $scope, $httpBackend, $element;
  var markup = '<cart-item></cart-item>';
  var directiveTpl = '<div class="cartitem"></div>';
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
