angular.module('shoppingCart')

.factory('Checkout', function($rootScope, $injector,$log, ShoppingCart) {
  
  var 
    items=[],
    $emit=$rootScope.$emit,
    mapFn=function(){return {price:0};};

  var 
    freeShipping=0,
    shipping=0,
    taxRate=0;

  var checkout = {
      total:0,
      subTotal:0,
      gatewayClosed:true,

      payNow: function(){
        checkout.gatewayClosed=false;
        $emit('checkout.payNow',items);
        ShoppingCart.clear();
      },

      clear:function(){
        ShoppingCart.clear();
        checkout.readOnly=false;
        update();
      },

      addItem:function(code,qty){
        ShoppingCart.addItem(code,qty);
        update();
      },

      removeItem:function(code) {
        ShoppingCart.removeItem(code);
        update();
      },

      map: function(cb){
        mapFn = cb;
        update();
      },

      setCosts:function(costs){
        taxRate=costs.taxRate||taxrate;
        shipping=costs.shipping||shipping;
        freeShipping=costs.freeShipping||freeShipping;
      }

    };

  function update() {
    var total = 0;
    var subTotal = 0;
    var count = 0;
    items=[];
    ShoppingCart.forEach(function(i){
      var item = mapFn(i.id);
      item.totalPrice = item.price * i.qty;
      item.quantity = i.qty;
      items.push(item);
      total+=item.totalPrice;
      subTotal+=item.totalPrice;
    });

    if (total) {
      if (total<freeShipping){
        total+=shipping;
        checkout.shippingCost=shipping;
      }
      else {
        checkout.shippingCost='free'; 
      }

      var tax = total * taxRate;
      checkout.tax = tax;
      checkout.total =total + tax;
      checkout.subTotal=subTotal;
    }
    else if (!checkout.readOnly) {
      $emit('checkout.empty');
    }
  }

  return checkout;

});
