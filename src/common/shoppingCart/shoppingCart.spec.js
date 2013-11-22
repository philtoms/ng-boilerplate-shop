describe('shoppingCart', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('service',function(){

    var service;

    beforeEach(module('shoppingCart'));

    beforeEach(inject(function($injector){
      service =  $injector.get('ShoppingCart');
    }));

    it('should add an item', function(){

      service.addItem("X");

      var item;
      service.forEach(function(_item){
        item=_item;
      });

      expect(item.id).toEqual("X");
      expect(item.qty).toEqual(1);

    });

    it('should add a quantity of items', function(){

      service.addItem("X",10);

      var item;
      service.forEach(function(_item){
        item=_item;
      });

      expect(item.id).toEqual("X");
      expect(item.qty).toEqual(10);

    });

    it('should calculate the total item count', function(){

      service.addItem("X",10);
      service.addItem("Y",5);

      expect(service.getItemCount()).toBe(15);

    });

    it('should remove an item', function(){

      service.addItem("X");
      service.removeItem("X");

      expect(service.hasItems()).toBeFalsy();

    });

    it('should remove a quantity of items from a larger quantity of items', function(){

      service.addItem("X",10);
      service.removeItem("X",5);

      expect(service.getItemCount()).toBe(5);

    });

    it('should clear all items', function(){

      service.addItem("X");
      service.addItem("Y");
      service.clear();

      expect(service.hasItems()).toBeFalsy();

    });

  });

  describe( 'directive', function() {
    var $scope, $element;
    var markup = '<shopping-cart>My Basket</shopping-cart>';

    beforeEach(module('shoppingCart'));

    beforeEach( inject( function($compile, $rootScope ) {
      $scope = $rootScope.$new();
      $element = $compile(markup)($scope);
      $scope.$digest();
    }));

    it( 'should inject html template', function() {
      // its a replacement
      var result = angular.element($element[0].outerHTML);
      expect( result.hasClass("shoppingcart") ).toBeTruthy();
      expect( result.text() ).toContain('My Basket');
      expect( result.text() ).toContain(' 0 items');
    });

    it( 'should prevent default action if cart is empty', function() {

      runs(function() {
        $element[0].click();
      }); 
       
      var result, flag=false;
      $scope.$on('shoppingCart.clicked', function(event, status){
        flag=true;
        result=status;
      });
      waitsFor(function() {
        return flag;
      }); 

      runs(function() {
        expect(result).toBeFalsy();
      }); 

    });

    it( 'should allow default action if cart is not empty', inject( function(ShoppingCart) {

      ShoppingCart.addItem("X");
      runs(function() {
        $element[0].click();
      }); 
       
      var result, flag=false;
      $scope.$on('shoppingCart.clicked', function(event, status){
        flag=true;
        result=status;
      });
      waitsFor(function() {
        return flag;
      }); 

      runs(function() {
        expect(result).toBeTruthy();
      }); 

    }));

    it( 'should watch for shopping cart item changes', inject( function(ShoppingCart) {
      ShoppingCart.addItem("X");
      $scope.$digest();
      // its a replacement
      var result = angular.element($element[0].outerHTML);
      expect( result.text() ).toContain(' 1 item');
    }));

  });

});
