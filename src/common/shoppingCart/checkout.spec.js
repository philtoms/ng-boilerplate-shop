describe('checkout', function() {

  var scope;

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach( function(){

    scope = {
      $emit:jasmine.createSpy('emit')
    };

    module( 'shoppingCart', function($provide){
      $provide.factory('$rootScope', function(){return scope;});
    });
  });

  describe('service',function(){

    var service,cart;

    beforeEach(function(){
      inject(function($injector){
        cart = $injector.get('ShoppingCart');
        cart.addItem("X",2);

        service = $injector.get('Checkout');

        service.map(function(id){
          return{
            price:10.01
          };
        });
      });
    });

    it('should emit a pay event', function(){
      service.payNow();
      expect(scope.$emit.mostRecentCall.args).toEqualData(['checkout.payNow', [ { price : 10.01, quantity : 2, totalPrice : 20.02 } ] ]);
    });

    it('should clear down cart', function(){
      service.clear();
      expect(scope.$emit.mostRecentCall.args).toEqualData(['checkout.empty']);
    });

  });

});
