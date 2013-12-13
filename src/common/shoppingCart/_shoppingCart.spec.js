describe('shoppingCart', function() {

  describe('service',function(){

    var service;

    function addItem(id,qty){
      var items=[];
      service.addItem(id,qty);
      service.forEach(function(_item){
        items.push(_item);
      });
      return items[0];
    }

    beforeEach(module('shoppingCart'));

    beforeEach(inject(function($injector){
      service =  $injector.get('ShoppingCart');
    }));

    it ( 'should be configurable for tax rates', function(){
      service.setTax({
          taxRate:0.20
      });
      expect(service.taxPrice(10)).toBe(12);
    });

    it('should register an item addition', function(){

      var item = addItem("X",1);
      expect(item.id).toEqual("X");
      expect(item.quantity).toEqual(1);

    });

    it('should add a quantity of items', function(){

      var item = addItem("X",10);
      expect(item.id).toEqual("X");
      expect(item.quantity).toEqual(10);

    });

    it('should calculate the total item count', function(){

      addItem("X",10);
      addItem("Y",5);

      expect(service.getItemCount()).toBe(15);

    });

    it('should calculate a single item line count', function(){

      addItem("X",10);
      addItem("Y",5);

      expect(service.getItemCount('X')).toBe(10);

    });

    it('should remove an item', function(){

      addItem("X");
      service.removeItem("X");

      expect(service.hasItems()).toBeFalsy();

    });

    it('should remove a quantity of items from a larger quantity of items', function(){

      addItem("X",10);
      service.removeItem("X",5);

      expect(service.getItemCount()).toBe(5);

    });

    it('should clear all items', function(){

      addItem("X");
      addItem("Y");
      service.clear();

      expect(service.hasItems()).toBeFalsy();

    });

  });

  describe( 'directive', function() {
    var $scope, $location, $element, $compile;

    beforeEach(module('shoppingCart', function($filterProvider){
      // need to supply this service for testing directive filter support  
      $filterProvider.register('itemCheckmark',function(){
        return function(input) {
          return input==1 ? '1 item' : input + ' items';
        };
      });
    }));

    beforeEach( inject( function(_$compile_, $rootScope, _$location_ ) {
      $scope = $rootScope.$new();
      $location = _$location_;
      $compile = _$compile_;
    }));

    describe ('without filter', function(){

      beforeEach(function(){
        var markup = '<shopping-cart href="#/checkout"></shopping-cart>';
        $element = $compile(markup)($scope);
        $scope.$digest();
      });

      it( 'should replace shopping cart markup', function() {
        expect($element.text()).toBe('0');
        expect($element.attr('href')).toBe('#/checkout');
        expect($element.hasClass('cart-empty')).toBeTruthy();
        expect($element[0].nodeName).toBe('A');
      });

      it( 'should prevent default action if cart is empty', function() {

        runs(function() {
          $element[0].click();
        }); 
         
        var result=false;
        $element.bind('click', function(event, status){
          result=true;
        });
        
        waitsFor(function() {
          return result;
        }); 

        runs(function() {
          expect($location.url()).toBe('');
        }); 

      });

      it( 'should allow default action if cart is not empty', inject( function(ShoppingCart) {

        ShoppingCart.addItem("X");
        runs(function() {
          $element[0].click();
        }); 
         
        var result=false;
        $element.bind('click', function(event, status){
          result=true;
        });
        
        waitsFor(function() {
          return result;
        }); 

        runs(function() {
          expect($location.url()).toBe('#%2Fcheckout');
        }); 

      }));


      it( 'should emit checkout message when selected', inject( function(ShoppingCart) {

        ShoppingCart.addItem("X");
        runs(function() {
          $element[0].click();
        }); 
         
        var result=false;
        $scope.$on('shoppingCart.checkout', function(event){
          result=true;
        });
        waitsFor(function() {
          return result;
        }); 

        runs(function() {
          expect(result).toBeTruthy();
        }); 
      }));

      it( 'should watch for shopping cart item changes', inject( function(ShoppingCart) {
        expect( $element.text() ).toBe('0');
        ShoppingCart.addItem("X");
        $scope.$digest();
        expect( $element.text() ).toBe('1');
      }));

      it( 'should update cart-empty class when items added and removed', inject( function(ShoppingCart) {
        expect($element.hasClass('cart-empty')).toBeTruthy();
        
        ShoppingCart.addItem("X");
        $scope.$digest();
        expect($element.hasClass('cart-empty')).toBeFalsy();
        
        ShoppingCart.removeItem("X");
        $scope.$digest();
        expect($element.hasClass('cart-empty')).toBeTruthy();
      }));

    });

    describe ('with filter', function(){

      beforeEach(function(){
        var markup = '<shopping-cart href="#/checkout">count | itemCheckmark</shopping-cart>';
        $element = $compile(markup)($scope);
        $scope.$digest();
      });
      
      it( 'should filter input text', inject( function(ShoppingCart) {
        expect($element.text()).toBe('0 items');
        ShoppingCart.addItem("X");
        $scope.$digest();
        expect($element.text()).toBe('1 item');
      }));

    });


    describe ('for single item line', function(){

      beforeEach(function(){
        var markup = '<shopping-cart item="{{item}}"></shopping-cart>';
        $scope.item='X';
        $element = $compile(markup)($scope);
        $scope.$digest();
      });
      
      it( 'should output single item count', inject( function(ShoppingCart) {
        expect($element.text()).toBe('0');
        ShoppingCart.addItem("X");
        ShoppingCart.addItem("Y");
        $scope.$digest();
        expect($element.text()).toBe('1');
      }));

    });

 
  });

});
