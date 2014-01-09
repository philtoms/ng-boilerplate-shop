describe( 'product page', function() {

  var url = '/base/build/index.html#!/products/';

  describe( 'smoke test', function() {

    it( 'should render empty product', function () {

      browser().navigateTo(url+'product-1');
      
      // header
      expect(element('title').text()).toContain('Product 1');
      expect(element('h1').text()).toBe('Product 1');
      expect(element('.intro').html()).toBe('<strong>The first product</strong>');

      // product
      expect(element('.mainImage').count()).toBe(0);

      // social buttons

      // empty cart (translates to: see product range)
      expect(element('.cart-item').count()).toBe(1);
      expect(element('.cart-item .range').count()).toBe(1);
      expect(element('.cart-item .price').count()).toBe(0);

      // empty tabs
      expect(element('tab').count()).toBe(0);
    });

    it( 'should render typical product', function () {

      browser().navigateTo(url+'product-2');

      // product
      expect(element('.mainImage').count()).toBe(1);

      describe ('cart', function(){

        it ('should be appended to product', function(){
          expect(element('.cart-item .range').count()).toBe(0);
          expect(element('.cart-item .price').count()).toBe(1);
        });

        it ('should be able to add to cart', function(){

        });
      });      

      // information tabs
      expect(element('.nav-tabs a').count()).toBe(2);
    });
  });

  describe('details tab', function(){

    beforeEach(function(){
      browser().navigateTo(url+'product-2');
    });

    it( 'should be appended to tabset', function () {
      expect(element('[heading="Details"]').count()).toBe(1);
    });

    it( 'should insert details into tab content', function () {
      expect(element('.tab-pane:first').text()).toContain('The 2nd product to be tested');
    });

  });

  describe('features tab', function(){

    beforeEach(function(){
      browser().navigateTo(url+'product-2');
    });

    it( 'should be appended to features tab', function () {
      expect(element('[heading="Features"]').count()).toBe(1);
      expect(element('.feature-link').count()).toBe(2);
    });

    describe ('embedded features', function(){
      
      it( 'should be translated into markup', function () {
        var markup = element('.feature-link:first').html();
        expect(markup).toMatch(/<span .*><a .*>text<\/a><\/span>/);
      });

      it( 'should be active', function(){
        // hidden
        expect(element('.popover-content').count()).toBe(0);
        // visible
        element('.feature-link:first a').click();
        expect(element('.popover-content').count()).toBe(1);
        // hidden
        element('.feature-link:first a').click();
        expect(element('.popover-content').count()).toBe(0);
      });

    });

    describe ('text features', function(){      

      it( 'should be appended unchanged', function () {
        expect(element('.feature-link:last').html()).toEqual("f2");
      });

    });
  });

  describe('dynamic tabs', function(){

    beforeEach(function(){
      browser().navigateTo(url+'product-3');
    });

    it( 'should be grouped and appended to tabset', function () {
      expect(element('.nav-tabs li').count()).toBe(4);
      expect(element('[heading="Accessories"]').count()).toBe(1);
      expect(element('[heading="HREFs"]').count()).toBe(1);
      expect(element('[heading="Range"]').count()).toBe(1);
      expect(element('[heading="Template"]').count()).toBe(1);
    });

    describe('product list', function(){

      it( 'should be inserted into tab content', function () {
        // p2 listed under accesories AND range
        expect(element('.tab-pane .products').count()).toBe(2);
      });

      it( 'should append shopping cart to product', function(){
        expect(element('.tab-pane .products .cart-item .price').count()).toBe(4); // (p2.inc+p2.exc) * 2 
        expect(element('.tab-pane .products .cart-item .range').count()).toBe(1); // p1
      });
    });
  });

  describe ( 'purchase item', function(){

    beforeEach(function(){
      browser().navigateTo(url+'product-2');
    });

    it ( 'should add item to shopping cart', function(){
      expect(element('.cart-items').text()).toBe('0');
      element('.buy').click();
      expect(element('.cart-items').text()).toBe('1');
    });

    it ( 'should display added item count as product checkmark', function(){
      expect(element('.item-line').text()).toBe('');
      element('.buy').click();
      expect(element('.item-line').text()).toBe('\u27131');
    });

    it ( 'should go to checkout when shopping cart with items clicked', function(){

      element('.buy').click();
      element('.cart-items').click();

      expect(browser().location().url()).toEqual('/checkout');
    });

    it ( 'should ignore checkout request when empty shopping cart clicked', function(){

    });

  });

});