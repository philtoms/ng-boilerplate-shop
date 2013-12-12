angular.module('shoppingCart')

.provider('Checkout', function() {
  
  var 
    gateway,
    gatewayProvider,
    cart,
    $emit,
    mapFn=function(){return {price:0};};

  var costs = {
    freeShipping:0,
    shipping:0,
    tax:0 // ha
  };

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
      },
      map: function(cb){
        mapFn = cb;
        update();
      }

    };

  function update() {
    var total = 0;
    var subTotal = 0;
    var count = 0;
    checkout.items=[];
    cart.forEach(function(i){
      var item = mapFn(i.id);
      item.totalPrice = item.price * i.qty;
      item.quantity = i.qty;
      checkout.items.push(item);
      total+=item.totalPrice;
      subTotal+=item.totalPrice;
    });

    if (total) {
      if (total<costs.freeShipping){
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
      $emit('checkout.empty');
    }
  }

  var defaultGateway = {
    pay:function(items){
      $emit('checkout.payNow',items);
    }
  };

  this.gateway = function(gatewayName) {
    if (!gatewayName) {
      return gateway; 
    }
    gatewayProvider = gatewayName;
    return this;
  };

  this.costs = function(_costs) {
    if (!_costs){
      return costs;
    }
    costs = angular.extend(costs,_costs);
    return this;
  };

  this.$get = function($scope,$injector,$log,ShoppingCart) {
    gateway = gatewayProvider? $injector.get(gatewayProvider) : defaultGateway; 
    cart = ShoppingCart;
    $emit = $scope.$emit;
    return checkout;
  };
});
