angular.module('shoppingCart.cart', [])


.factory('ShoppingCart', function() {

  var items={},
    itemsCount=0,
    taxRate=0,
    taxSuffix=['exc. tax','inc. tax'];

  var cart = {
    getItemCount:  function(item) {
      if (!item) {
        return itemsCount;
      }
      return items[item] || 0;
    },

    hasItems: function(item) {
      return cart.getItemCount(item)>0;
    },

    clear: function() {
      items={};
      itemsCount=0;
    },

    addItem: function(id,qty) {
      if (!items[id]){
        items[id]=0;
      }
      items[id]+=qty||1;
      itemsCount+=qty||1;
    },

    removeItem: function(id,qty) {
      if (items[id]){
        items[id]-=qty||1;
        itemsCount-=qty||1;
        if (items[id]<=0) {
          delete items[id];
        }
      }
    },

    taxPrice: function(price){
      return taxRate ? 
        price + (price * taxRate)
        : price;
    },

    taxSuffix: function(ind){
      return taxSuffix[ind];
    },

    forEach: function(cb){
      for (var i in items){
        cb({id:i,quantity:items[i]});
      }
    },

    setTax:function(costs){
      taxRate=costs.taxRate||taxRate;
      taxSuffix=costs.taxSuffix||taxSuffix;
    }

  };

  return cart;

})

.directive('shoppingCart', function($location, ShoppingCart) {
  var href='';
  return {
    restrict:'E',
    replace:true,
    scope:{},
    template: function(tElement, tAttrs){
      // allow expression placeholder for user defined filters
      var expr = tElement.text().replace(/{{(.*)}}/,'$1');
      var parts = ['getItemCount(item)'].concat(expr.split('|').slice(1));
      expr = parts.join('|');
      return '<a ng-class="{\'cart-items\':!item,\'item-line\':item,\'cart-empty\':!getItemCount(item)}">{{'+expr+'}}</a>';
    },
    link: function(scope, element, attrs) {
      href = attrs.href || href;
      scope.item = attrs.item;
      scope.getItemCount=ShoppingCart.getItemCount;
      element.bind('click', function(event) {
        event.preventDefault();
        if (ShoppingCart.hasItems(scope.item)){
          if (href){
            $location.url(href);
            scope.$apply();
          }
          scope.$emit('shoppingCart.checkout', status);
        }
      });
    }
  };
});
