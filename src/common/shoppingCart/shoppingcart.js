angular.module('shoppingCart', [])


.factory('ShoppingCart', function() {

  var items={};

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
    },

    forEach: function(cb){
      for (var i in items){
        cb({id:i,qty:items[i]});
      }
    }
  };

  return cart;

});

angular.module('shoppingCart').directive('shoppingCart', function(ShoppingCart) {
  return {
    replace:true,
    restrict:'AE',
    scope:{},
    template: function(element, attrs) {
      var cartTitle = element.text();
      return "<a class='shoppingcart'>"+cartTitle+"<span class='itemcount'>{{itemCount}}</span></a>";
    },
    link: function(scope, element, attrs) {
      scope.$watch(ShoppingCart.getItemCount,function(nv){
        scope.itemCount = nv==1? ' 1 item':" "+nv+" items";
      });
      element.bind('click', function(event) {
        var status=true;
        if (!ShoppingCart.hasItems()){
          event.preventDefault();
          status=false;
        }
        scope.$emit('shoppingCart.clicked', status);
      });
    }
  };
});
