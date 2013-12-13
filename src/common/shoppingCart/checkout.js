angular.module('shoppingCart.checkout', [
  'shoppingCart.cart'
  ])

.factory('Checkout', function($injector, $q, $log, ShoppingCart) {

  var 
    freeShipping = 0,
    shipping = 0,
    taxRate = 0;

  var checkout = {

    getItemCount: function(){
      return ShoppingCart.getItemCount();
    },

    runItems: function(mapFn){
      return update(mapFn);
    },

    setRates:function(costs){
      taxRate=costs.taxRate||taxRate;
      shipping=costs.shipping||shipping;
      freeShipping=costs.freeShipping||freeShipping;
    }

  };

  function update(mapFn) {

    var promises = [];

    ShoppingCart.forEach(function(item){
      promises.push(mapFn(item.id));
    });

    return $q.all(promises).then(function(data) {
      var total = 0;
      var subTotal = 0;
      var tax = 0;
      var shippingCost = 0;
      var items = [];

      angular.forEach(data,function(item){

        item.quantity = ShoppingCart.getItemCount(item.id);
        item.totalPrice = item.price * item.quantity;
        total+=item.totalPrice;
        subTotal+=item.totalPrice;

        items.push(item);
      });

      if (total) {
        if (total<freeShipping){
          total+=shipping;
          shippingCost=shipping;
        }
        tax = total * taxRate;
      }

      return {
        items: items,
        total: total + tax,
        subTotal: subTotal,
        tax: tax,
        shippingCost:shippingCost
      };
    });
  }

  return checkout;

})

;
