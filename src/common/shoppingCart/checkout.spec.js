describe('checkout', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  var scope, testGateway;
  beforeEach( function(){

    scope = {
      $emit:jasmine.createSpy('emit')
    };

    testGateway = {
      pay:function(units){}
    };

    module( 'shoppingCart', function($provide){
      $provide.factory('$scope', function(){return scope;});
      $provide.factory('testGateway', function(){return testGateway;});
    });
  });

  describe('provider',function(){
  
    // http://stackoverflow.com/questions/14771810/how-to-test-angularjs-custom-provider
    var CheckoutProvider;
    var costs = { freeShipping : 0, shipping : 0, tax : 20 };

    beforeEach(function () {
        // Initialize the service provider 
        // by injecting it to a fake module's config block
        var fakeModule = angular.module('test.app.config', [], function () {});
        fakeModule.config( function (_CheckoutProvider_) {
            CheckoutProvider = _CheckoutProvider_;
        });
        // Initialize test.app injector
        module('test.app.config');

        // Kickstart the injectors previously registered 
        // with calls to angular.mock.module
        inject(function () {});
    });

    describe('configuration', function () {

        it('overrides default costs', function () {
            expect (CheckoutProvider.costs()).toEqualData(costs);
            CheckoutProvider.costs({tax:25});
            expect (CheckoutProvider.costs().shipping).toBe(0);
            expect (CheckoutProvider.costs().tax).toBe(25);
        });

        it('overrides default gateway', inject(function ($injector) {
            CheckoutProvider.gateway('testGateway');
            // invoke the checkout to load the gateway
            $injector.get('Checkout');
            expect (CheckoutProvider.gateway()).toEqualData(testGateway);
        }));

    });
  });

  describe('service',function(){

    var service,cart;

    beforeEach(function(){
      inject(function($injector){
        cart = $injector.get('ShoppingCart');
        cart.addItem("X");

        service = $injector.get('Checkout')(function(id){
          return{
            price:10
          };
        });
      });
    });

    it('should emit a pay event', function(){
      service.payNow();
      expect(scope.$emit.mostRecentCall.args).toEqualData(['checkout.payNow', [ { price : '10.00', quantity : 1, totalPrice : '10.00' } ] ]);
    });

    it('should clear down cart', function(){
      expect(service.items).toEqualData([ { price : '10.00', quantity : 1, totalPrice : '10.00' } ]);
      service.clear();
      expect(service.items).toEqualData([]);
    });

  });

});
