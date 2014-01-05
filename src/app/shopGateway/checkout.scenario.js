describe( 'checkout page', function() {

  var startUrl = '/products/product-2';
  
  beforeEach(function(){

      browser().navigateTo('/base/build/index.html#!'+startUrl);
      element('.buy').click();

  });

  describe( 'smoke test', function() {

    it( 'should render checkout page', function () {

      // navigate to checkout via basket
      element('.cart-items').click();
  
      expect(element('h1').text()).toBe('Complete your purchase');
      expect(binding('checkout.total')).toBe('$23.99');
      expect(element('.btn-primary').text()).toBe('Pay now');

    });
  });


  describe( 'item options', function() {

    beforeEach(function(){
      // add 1 more item
      element('.buy').click();
      // navigate to checkout via basket
      element('.cart-items').click();
    });

    it( 'should remove an item and redisplay the checkout', function () {
      expect(binding('checkout.total')).toBe('$35.99');
      element('.btn.remove:first').click();
      expect(element('.cart-items').text()).toBe('1');
      expect(binding('checkout.total')).toBe('$23.99');
    });

    it( 'should return to previous page when all items removed', function () {
      element('.btn.remove:first').click();
      element('.btn.remove:first').click();
      expect(browser().location().url()).toBe(startUrl);
      expect(element('.cart-items').text()).toBe('0');
    });

  });

  describe( 'navigation options', function() {

    beforeEach(function(){
      // navigate to checkout via basket
      element('.cart-items').click();
    });

    it( 'should clear items and return to previous page', function () {
      element('.btn.clear').click();
      expect(browser().location().url()).toBe(startUrl);
      expect(element('.cart-items').text()).toBe('0');
    });

    it( 'should return to previous display with basket contents intact', function () {
      element('.btn.continue').click();
      expect(browser().location().url()).toBe(startUrl);
      expect(element('.cart-items').text()).toBe('1');
    });
  });

});