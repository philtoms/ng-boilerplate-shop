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
      $provide.factory('$scope', function(){return scope;});
    });
  });

  describe('service',function(){

    var service,cart, $rootScope;

    function itemMap(){
      return {id:"X",price:10.00};
    }

    function runItems(){
      var checkout;
      service.runItems(itemMap).then(function(data){
        checkout = data;
      });
      $rootScope.$digest();
      waitsFor(function(){
        return checkout;
      });
      return checkout;
    }

    beforeEach(function(){
      inject(function($injector, _$rootScope_){

        $rootScope = _$rootScope_;
        cart = $injector.get('ShoppingCart');
        cart.addItem("X",2);

        service = $injector.get('Checkout');

        service.runItems(itemMap);
      });
    });

    it ( 'should run shopping cart items through checkout and produce a total', function(){
      var checkout = runItems();
      expect(checkout.total).toBe(20);
    });

    it ( 'should run shopping cart items through checkout and produce item totals', function(){
      var checkout = runItems();
      expect(checkout.items.length).toBe(1);
      expect(checkout.items[0].id).toBe('X');
      expect(checkout.items[0].price).toBe(10);
      expect(checkout.items[0].totalPrice).toBe(20);
      expect(checkout.items[0].quantity).toBe(2);
    });

    it ( 'should be configurable for tax and shipping rates', function(){
      service.setRates({
          shipping:10,
          freeShipping:200,
          taxRate:0.20
      });
      var checkout = runItems();
      expect(checkout.subTotal).toBe(20.00);
      expect(checkout.shippingCost).toBe(10.00);
      expect(checkout.tax).toBe(6.00);
      expect(checkout.total).toBe(36.00);
    });

    it ( 'should apply shipping rates below free shipping threshold', function(){
      service.setRates({
          freeShipping:200,
          shipping:20.00
      });
      var checkout = runItems();
      expect(checkout.total).toBe(40.00);
      expect(checkout.shippingCost).toBe(20.00);
    });

    it ( 'should apply free shipping above free shipping threshold', function(){
      service.setRates({
          freeShipping:1,
          shipping:20.00
      });
      var checkout = runItems();
      expect(checkout.total).toBe(20.00);
      expect(checkout.shippingCost).toBe(0);
    });

    it ( 'should register shopping cart additions', function(){
      expect(service.getItemCount()).toBe(2);
      cart.addItem("Y");
      service.runItems(itemMap);
      expect(service.getItemCount()).toBe(3);
    });

    it ( 'should register shopping cart deletions', function(){
      expect(service.getItemCount()).toBe(2);
      cart.removeItem("X");
      service.runItems(itemMap);
      expect(service.getItemCount()).toBe(1);
    });

  });

});
