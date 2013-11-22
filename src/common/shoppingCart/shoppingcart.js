angular.module('shoppingCart', [])


.provider('ShoppingCart', function() {

  var items={};
  var costs;
  var checkingOut;
  var gateway;
  var gatewayProvider;

  var cart = {
    getItemCount:  function() {
      var count=0;
      angular.forEach(items,function(value){
        count+=value;
      });
      return count;
    },

    hasItems: function() {
      return cart.getItemCount()>0;
    },

    clear: function() {
      items={};
    },

    addItem: function(code,qty) {
      if (!items[code]){
        items[code]=0;
      }
      items[code]+=qty||1;
    },

    removeItem: function(code,qty) {
      if (items[code]){
        items[code]-=qty||1;
        if (items[code]<=0) {
          delete items[code];
        }
      }
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

  this.$get = function($injector,$log) {
    gateway = $injector.get(gatewayProvider);
    return _cart;
  };

})


.directive('shoppingCart', function(ShoppingCart) {
  var cartTitle;
  return {
    replace:true,
    scope:{},
    template: function(element, attrs) {
      cartTitle = element.text();
      return "<a class='shoppingcart'>{{cartTitle}}<span class='itemcount'>{{itemCount}}</span></a>";
    },
    link: function(scope, element, attrs) {
      scope.cartTitle = cartTitle;
      scope.$watch(ShoppingCart.getItemCount,function(nv){
        scope.itemCount = nv==1? ' 1 item':" "+nv+" items";
      });
      element.bind('click', function(event) {
        if (!ShoppingCart.hasItems()){
          event.preventDefault();
        }
      });
    }
  };
});
