angular.module('checkout',[])

.provider('Checkout', function() {
  
  var costs,
    gateway,
    gatewayProvider,
    cart,
    scope;

  var checkout = {
      total:0,
      subTotal:0,
      items:[],
      gatewayClosed:true,
      payNow: function(){
        checkout.gatewayClosed=false;
        gateway.pay(checkout.items);
        cart.clear();
      },
      clear:function(){
        cart.clear();
        checkout.readOnly=false;
        update();
      },
      addItem:function(code,qty){
        cart.addItem(code,qty);
        update();
      },
      removeItem:function(code) {
        cart.removeItem(code);
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

  var defaultGateway = {
    pay:function(items){
      scope.$emit('checkout.payNow',items);
    }
  };

  this.setGateway = function(gatewayName) {
    gatewayProvider = gatewayName;
    return this;
  };

  this.setCosts = function(_costs) {
    costs = _costs;
    return this;
  };

  this.$get = function($scope,$injector,$log,ShoppingCart) {
    gateway = gatewayProvider? $injector.get(gatewayProvider) : defaultGateway; 
    cart = ShoppingCart;
    scope = $scope;
    return checkout;
  };
});
