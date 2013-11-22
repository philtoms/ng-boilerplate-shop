angular.module('shoppingCart',[])

.factory('CheckoutService', function(ShoppingCart) {
  
  var checkout = {
      total:0,
      subTotal:0,
      items:[],
      gatewayClosed:true,
      payNow: function(){
        checkout.gatewayClosed=false;
        gateway.pay(checkout);
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
      }
    };

  function update() {
    var total = 0;
    var subTotal = 0;
    var count = 0;
    checkout.items=[];
    angular.forEach(items,function(v,k){
      var item = checkout.map(k);
      var totalPrice = item.price * v;
      item.quantity = v;
      item.totalPrice = totalPrice.toFixed(2);
      checkout.items.push(item);
      total+=totalPrice;
      subTotal+=totalPrice;
    });

    if (total) {
      if (!costs.freeShipping || total<costs.freeShipping){
        total+=costs.shipping;
        checkout.shippingCost=costs.shipping;
      }
      else {
        checkout.shippingCost='free'; 
      }

      var tax = total * costs.taxRate / 100;
      checkout.tax = tax.toFixed(2);
      checkout.total =(total + tax).toFixed(2);
      checkout.subTotal=subTotal.toFixed(2);
    }
    else if (!checkout.readOnly) {
      checkout.onEmpty();
    }
  }

  return function(options) {
    checkout = angular.extend (checkout,options);
    if (checkout.readOnly) {
      ShoppingCart.clear();
    }
    else {
      update();
    }

    return checkout;
  };
});
