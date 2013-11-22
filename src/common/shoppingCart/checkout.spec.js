describe('checkout', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('service',function(){

    var service, shoppingCart;
    var scope = {
      $emit:jasmine.createSpy('emit')
    };

    beforeEach( function(){
      module( 'checkout', 'shoppingCart', function($provide){
        $provide.factory('$scope', function(){return scope;});
      });
    });

    beforeEach(function(){
      inject(function($injector){
        service =  $injector.get('Checkout');
      });
    });

    it('should emit a pay event', function(){
      service.payNow();
      expect(scope.$emit).toHaveBeenCalledWith('checkout.payNow', [  ]);
    });

  });

});
